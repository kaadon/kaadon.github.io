# Elasticsearch 部署文档

> **Elasticsearch** 是基于 Lucene 的分布式全文搜索与分析引擎，广泛用于日志检索、全文搜索、数据分析等场景。

---

## 目录

- [1. Compose 配置](#compose)
- [2. 环境变量说明](#env)
- [3. 启动与验证](#startup)
- [4. 生产优化建议](#production)

---

## 1. Compose 配置 {#compose}

```yaml
services:
  elasticsearch:
    image: elasticsearch:7.17.28
    container_name: elasticsearch
    restart: always
    environment:
      - cluster.name=es-single
      - node.name=es-node-1
      - discovery.type=single-node
      - network.host=0.0.0.0
      - http.port=9200
      - bootstrap.memory_lock=true
      - ES_JAVA_OPTS=-Xms4g -Xmx4g
      - xpack.security.enabled=false
      - xpack.security.http.ssl.enabled=false
      - xpack.security.transport.ssl.enabled=false
      - ingest.geoip.downloader.enabled=false
      - logger.level=WARN
      - xpack.ml.enabled=false
      - xpack.monitoring.collection.enabled=false
    ulimits:
      memlock:
        soft: -1
        hard: -1
    ports:
      - "9200:9200"   # HTTP REST API
      - "9300:9300"   # 节点间通信（单节点可不暴露）
    volumes:
      - ./data:/usr/share/elasticsearch/data
      - ./logs:/usr/share/elasticsearch/logs
    networks:
      - docker
    logging:
      driver: "json-file"
      options:
        max-size: "50m"
        max-file: "5"
    deploy:
      resources:
        limits:
          cpus: "4.0"
          memory: 8G
        reservations:
          memory: 1G

networks:
  docker:
    external: true
```

---

## 2. 环境变量说明 {#env}

可将环境变量抽离为独立的 `.env` 文件挂载，便于多环境管理：

```dotenv
cluster.name=es-single
node.name=es-node-1
discovery.type=single-node
network.host=0.0.0.0
http.port=9200
bootstrap.memory_lock=true
ES_JAVA_OPTS=-Xms4g -Xmx4g
xpack.security.enabled=false
xpack.security.http.ssl.enabled=false
xpack.security.transport.ssl.enabled=false
xpack.ml.enabled=false
xpack.monitoring.collection.enabled=false
```

| 变量 | 说明 |
|------|------|
| `ES_JAVA_OPTS` | JVM 堆内存，建议设为物理内存的 50%，最大不超过 32G |
| `bootstrap.memory_lock` | 锁定内存，防止 swap，需配合 `ulimits.memlock: -1` |
| `discovery.type=single-node` | 单节点模式，跳过集群选举 |
| `xpack.security.enabled` | 关闭安全认证，**生产环境建议开启** |
| `logger.level=WARN` | 仅输出警告及以上日志，减少 I/O |

---

## 3. 启动与验证 {#startup}

```bash
# 首次使用：创建外部网络
docker network create docker

# 宿主机需设置 vm.max_map_count（否则 ES 启动报错）
sysctl -w vm.max_map_count=262144
# 永久生效
echo "vm.max_map_count=262144" >> /etc/sysctl.conf

# 后台启动
docker compose up -d

# 查看运行状态
docker compose ps

# 实时查看日志
docker compose logs -f elasticsearch
```

验证服务是否就绪：

```bash
# 查看集群健康状态
curl http://127.0.0.1:9200/_cluster/health?pretty

# 查看节点信息
curl http://127.0.0.1:9200/_cat/nodes?v
```

---

## 4. 生产优化建议 {#production}

| 项目 | 建议 |
|------|------|
| **安全认证** | 开启 `xpack.security.enabled=true`，设置账号密码 |
| **JVM 堆内存** | 设为物理内存的 50%，`-Xms` 与 `-Xmx` 设置相同值避免动态扩缩 |
| **数据目录** | 挂载到独立高速 SSD，避免与系统盘共用 |
| **vm.max_map_count** | 宿主机必须设置为 262144，否则 ES 无法启动 |
| **9300 端口** | 单节点部署无需对外暴露，可移除端口映射 |
| **镜像版本** | 锁定具体版本号，避免 `latest` 引入破坏性更新 |
