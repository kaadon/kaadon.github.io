# Coturn 部署文档

> **Coturn** 是开源 TURN/STUN 服务器，用于 WebRTC 场景下的 NAT 穿透与媒体流中继。

---

## 目录

- [1. Compose 配置](#compose)
- [2. 启动与验证](#startup)
- [3. 参数说明](#params)
- [4. 生产优化建议](#production)

---

## 1. Compose 配置 {#compose}

```yaml
services:
  coturn:
    image: coturn/coturn:4.7.0
    container_name: coturn
    restart: always
    network_mode: "host"   # 宿主机网络模式，TURN 中继性能最优
    command:
      - "--no-cli"
      - "--log-file=stdout"
      - "--pidfile=/var/tmp/turnserver.pid"
      - "--realm=webrtc.local"
      - "--external-ip=<YOUR_PUBLIC_IP>"   # 替换为服务器公网 IP
      - "--relay-ip=<YOUR_PUBLIC_IP>"      # 替换为服务器公网 IP
      - "--min-port=49152"
      - "--max-port=65535"
      - "--lt-cred-mech"
      - "--user=webrtc:webrtc"             # 替换为强密码
      - "--no-tls"
      - "--no-dtls"
    volumes:
      - /etc/localtime:/etc/localtime:ro
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
          memory: 512M
```

---

## 2. 启动与验证 {#startup}

```bash
# 后台启动
docker compose up -d

# 查看运行状态
docker compose ps

# 实时查看日志
docker compose logs -f coturn
```

验证 STUN/TURN 是否可达：

```bash
# 测试 STUN（需安装 stun-client）
stun <host>:3478

# 或使用在线工具：https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/
# STUN/TURN Server: turn:<host>:3478
# Username: webrtc
# Credential: webrtc
```

| 端口 | 协议 | 说明 |
|------|------|------|
| `3478` | UDP/TCP | STUN / TURN 标准端口 |
| `5349` | UDP/TCP | TURN over TLS（启用 TLS 时使用） |
| `49152-65535` | UDP | 媒体流中继端口范围 |

---

## 3. 参数说明 {#params}

| 参数 | 说明 |
|------|------|
| `--realm` | TURN 域名，客户端认证时使用 |
| `--external-ip` | 服务器公网 IP，NAT 环境必填 |
| `--relay-ip` | 媒体流中继绑定 IP，通常与 `external-ip` 相同 |
| `--min-port / --max-port` | 中继端口范围，需在防火墙中放行 |
| `--lt-cred-mech` | 启用长期凭证认证机制 |
| `--user` | 认证用户，格式 `username:password` |
| `--no-tls / --no-dtls` | 禁用 TLS/DTLS，内网或测试环境可用 |

---

## 4. 生产优化建议 {#production}

| 项目 | 建议 |
|------|------|
| **账号安全** | 修改 `--user` 为强密码，避免使用 `webrtc:webrtc` |
| **TLS 加密** | 生产环境移除 `--no-tls / --no-dtls`，配置证书启用加密传输 |
| **防火墙** | 开放 `3478`（UDP/TCP）及中继端口范围 `49152-65535`（UDP） |
| **多用户** | 使用 `--userdb` 指定 SQLite 数据库管理多账号 |
| **监控** | 通过 `--log-file=stdout` 配合 Docker 日志驱动接入日志系统 |
