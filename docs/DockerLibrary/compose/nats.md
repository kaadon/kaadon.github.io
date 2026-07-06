# NATS 部署文档

> **NATS** 是 CNCF 云原生高性能消息中间件，支持发布/订阅、请求/响应及 JetStream 持久化流。本文档部署 3 节点 JetStream 集群，兼顾高可用与消息持久化。

---

## 目录

- [1. Compose 配置](#compose)
- [2. 鉴权配置](#auth)
- [3. 启动与验证](#startup)
- [4. 生产优化建议](#production)

---

## 1. Compose 配置 {#compose}

采用 `nats1 -> nats2 -> nats3` 有序启动，确保 Docker DNS 已能解析种子节点后再建立集群路由，避免 leader 抖动与 `server misbehaving` 报错。

```yaml
services:
  nats1:
    image: nats:latest
    container_name: nats1
    command:
      - "--name=nats1"
      - "--cluster_name=nats_cluster"
      - "--cluster=nats://0.0.0.0:6222"
      - "--cluster_advertise=nats1:6222"
      - "--routes=nats://nats2:6222,nats://nats3:6222"
      - "--http_port=8222"
      - "-js"                              # 开启 JetStream
      - "--store_dir=/data"                # JetStream 持久化目录
      - "--config=/etc/nats/auth.conf"     # 鉴权配置
    ports:
      - "4222:4222"   # 客户端连接端口
      - "8222:8222"   # HTTP 监控端口
    volumes:
      - /www/docker/nats-clickhouse/nats/nats1:/data
      - /www/docker/nats-clickhouse/nats/nats-auth.conf:/etc/nats/auth.conf:ro
    # 注意: nats:latest 为 scratch 极简镜像，内部无 wget/curl/sh，
    # 无法在容器内执行 HTTP healthcheck，故不设 healthcheck，
    # 依赖关系改用 service_started（DNS 可解析即可，集群路由自带重连）
    restart: always
    networks:
      - docker

  nats2:
    image: nats:latest
    container_name: nats2
    # 等种子节点 nats1 启动后再启动，确保 Docker DNS 已能解析 nats1，
    # 避免路由建立时 "lookup nats1 ... server misbehaving" 及 leader 抖动
    depends_on:
      nats1:
        condition: service_started
    command:
      - "--name=nats2"
      - "--cluster_name=nats_cluster"
      - "--cluster=nats://0.0.0.0:6222"
      - "--cluster_advertise=nats2:6222"
      - "--routes=nats://nats1:6222,nats://nats3:6222"
      - "--http_port=8222"
      - "-js"
      - "--store_dir=/data"
      - "--config=/etc/nats/auth.conf"
    volumes:
      - /www/docker/nats-clickhouse/nats/nats2:/data
      - /www/docker/nats-clickhouse/nats/nats-auth.conf:/etc/nats/auth.conf:ro
    restart: always
    networks:
      - docker

  nats3:
    image: nats:latest
    container_name: nats3
    # 依次等 nats1、nats2 启动，形成 1 -> 2 -> 3 有序启动，路由一次建立成功
    depends_on:
      nats1:
        condition: service_started
      nats2:
        condition: service_started
    command:
      - "--name=nats3"
      - "--cluster_name=nats_cluster"
      - "--cluster=nats://0.0.0.0:6222"
      - "--cluster_advertise=nats3:6222"
      - "--routes=nats://nats1:6222,nats://nats2:6222"
      - "--http_port=8222"
      - "-js"
      - "--store_dir=/data"
      - "--config=/etc/nats/auth.conf"
    volumes:
      - /www/docker/nats-clickhouse/nats/nats3:/data
      - /www/docker/nats-clickhouse/nats/nats-auth.conf:/etc/nats/auth.conf:ro
    restart: always
    networks:
      - docker

networks:
  docker:
    external: true
```

| 端口 | 说明 |
|------|------|
| `4222` | 客户端连接端口（SDK / CLI） |
| `6222` | 集群内部路由端口（节点间通信，不对外暴露） |
| `8222` | HTTP 监控端口（`/varz`、`/jsz` 等运维接口） |

---

## 2. 鉴权配置 {#auth}

三个节点共用同一份 `nats-auth.conf`（挂载为容器内 `/etc/nats/auth.conf`），采用**主题级权限白名单**模型：匿名消费者只读订阅业务主题，发布方使用独立服务账号。修改密码后需重启三个 nats 容器生效。

```conf
# NATS 推送白名单
# - 匿名连接（消费者）：只能订阅 eth.>，不能发布业务消息
# - eth_publisher（服务账号）：可发布 eth.>

# ── 服务端连接容错 ──
# write_deadline: 服务端向客户端写数据的超时（默认 10s）。跨公网带宽小、
#   客户端消费慢时，10s 内推不完会判定 Slow Consumer 并断开连接。
#   调大给慢客户端更多写入时间，作为服务端侧兜底。
write_deadline: "30s"
# max_pending: 单个客户端连接允许积压的最大待发字节数（默认 64MB）。
#   调大可容纳更大的消息洪峰缓冲，降低瞬时堆积导致的断开。
max_pending: 256MB

# 未认证连接使用 consumer 权限
no_auth_user: consumer

authorization {
  users: [
    # 匿名消费者：无需密码，只读订阅
    # 说明：JetStream 手动 Ack 需向 $JS.ACK.> 发布确认消息，
    #   缺少该权限会报 "Permissions Violation for Publish to $JS.ACK...."，
    #   导致 Ack 失败、消息被重复投递。故必须放行 $JS.ACK.>。
    {
      user: consumer
      permissions: {
        publish:   { allow: ["$JS.API.>", "$JS.ACK.>", "_INBOX.>"] }
        subscribe: { allow: ["eth.>", "$JS.>", "_INBOX.>"] }
      }
    }
    # ethereum-monitor 服务账号：可发布 eth.>
    {
      user: eth_publisher
      password: "eth_pub_pass"          # 生产环境替换为强密码
      permissions: {
        publish:   { allow: ["eth.>", "$JS.API.>", "_INBOX.>"] }
        subscribe: { allow: ["_INBOX.>", "$JS.ACK.>", "$JS.API.>"] }
      }
    }
  ]
}
```

**权限模型要点：**

| 账号 | 密码 | 发布权限 | 订阅权限 | 用途 |
|------|------|----------|----------|------|
| `consumer` | 无（匿名） | `$JS.API.>`、`$JS.ACK.>`、`_INBOX.>` | `eth.>`、`$JS.>`、`_INBOX.>` | 只读消费者，默认匿名账号 |
| `eth_publisher` | `eth_pub_pass` | `eth.>` 及 JS API | `_INBOX.>`、`$JS.ACK.>`、`$JS.API.>` | 业务发布方（ethereum-monitor） |

> 关键：JetStream 手动 Ack 需向 `$JS.ACK.>` 发布确认消息，消费者账号必须放行该主题，否则会报 `Permissions Violation for Publish to $JS.ACK...` 并导致消息重复投递。

---

## 3. 启动与验证 {#startup}

```bash
# 首次使用：创建外部网络
docker network create docker

# 后台启动
docker compose up -d

# 查看运行状态
docker compose ps

# 实时查看日志
docker compose logs -f nats1
```

集群状态验证：

```bash
# 查看服务器基本信息（连接数、内存等）
curl -s http://<host>:8222/varz | jq

# 查看集群路由状态，确认 3 个节点互联
curl -s http://<host>:8222/routez | jq

# 查看 JetStream 状态与 Raft 集群信息
curl -s http://<host>:8222/jsz | jq
```

使用 NATS CLI 验证收发：

```bash
# 消费者：匿名连接，只读订阅 eth.>
nats context save consumer \
  --server nats://<host>:4222 --select
nats sub "eth.>"                          # 订阅业务主题

# 发布方：使用 eth_publisher 服务账号发布 eth.>
nats context save publisher \
  --server nats://<host>:4222 \
  --user eth_publisher --password eth_pub_pass --select
nats pub eth.block "hello"                # 发布，消费者端应收到

# 查看 JetStream 集群报告
nats server report jetstream
```

| 地址 | 说明 |
|------|------|
| `nats://<host>:4222` | 客户端连接地址 |
| `http://<host>:8222` | HTTP 监控接口 |

---

## 4. 生产优化建议 {#production}

| 项目 | 建议 |
|------|------|
| **账号安全** | 务必替换鉴权文件中的默认密码，客户端与路由使用不同账号 |
| **持久化目录** | 将 `store_dir` 对应的宿主机目录挂载到独立高速数据盘，定期备份 |
| **集群节点数** | JetStream 使用 Raft 选举，建议奇数节点（3 或 5），保证过半可用 |
| **资源限制** | 在 `jetstream` 中设置 `max_memory_store` / `max_file_store`，防止磁盘写满 |
| **端口暴露** | `6222` 集群端口仅限内部网络，切勿对外暴露 |
| **监控告警** | 通过 `/varz`、`/jsz` 接口对接 Prometheus（`nats-exporter`）监控连接与流状态 |
| **镜像版本** | 锁定具体版本号，避免 `latest` 引入破坏性更新 |
| **有序启动** | 保持 `depends_on` 的有序依赖，避免路由建立时种子节点 DNS 未就绪 |
