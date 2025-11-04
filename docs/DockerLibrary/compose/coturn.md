# <center> coturn 部署 </center>

## 1 . Compose 安装 coturn:4.7.0
```text

services:
  coturn4:
    image: coturn/coturn:4.7.0
    container_name: coturn4
    restart: always
    network_mode: "host"  # ✅ 宿主机网络，性能最高
    command:
      - "--no-cli"
      - "--log-file=stdout"
      - "--pidfile=/var/tmp/turnserver.pid"
      - "--realm=webrtc.local"
      - "--external-ip=103.86.47.17"
      - "--relay-ip=103.86.47.17"
      - "--min-port=49152"
      - "--max-port=65535"
      - "--lt-cred-mech"
      - "--user=webrtc:webrtc"
      - "--no-tls"
      - "--no-dtls"
    volumes:
      - /etc/localtime:/etc/localtime:ro
    deploy:
      resources:
        limits:
          cpus: "4.0"
          memory: 8gb
    cpus: "4.0"
    mem_limit: 8gb
```

