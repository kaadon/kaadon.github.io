# <center> clickhouse 部署 </center>

## 1 . Compose 安装 clickhouse
```text
services:
  clickhouse:
    image: clickhouse/clickhouse-server:latest
    container_name: clickhouse
    ports:
      - "8123:8123"
      - "9000:9000"
    ulimits:
      nofile:
        soft: 262144
        hard: 262144
    restart: always
    networks:
      docker:
        ipv4_address: 10.0.0.3
networks:
  docker:
    external: true
```

