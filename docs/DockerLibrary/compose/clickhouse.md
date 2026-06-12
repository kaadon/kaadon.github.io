# ClickHouse 部署文档

> **ClickHouse** 是俄罗斯 Yandex 开源的列式 OLAP 数据库，擅长海量数据的实时聚合分析查询。

---

## 目录

- [1. Compose 配置](#compose)
- [2. 启动与验证](#startup)
- [3. 生产优化建议](#production)

---

## 1. Compose 配置 {#compose}

```yaml
services:
  clickhouse:
    image: clickhouse/clickhouse-server:latest
    container_name: clickhouse
    restart: always
    ports:
      - "8123:8123"   # HTTP 接口（REST / Web UI）
      - "9000:9000"   # Native TCP 接口（客户端 SDK）
    ulimits:
      nofile:
        soft: 262144
        hard: 262144
    volumes:
      - ./data:/var/lib/clickhouse
      - ./logs:/var/log/clickhouse-server
    networks:
      docker:
        ipv4_address: 10.0.0.3
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

## 2. 启动与验证 {#startup}

```bash
# 首次使用：创建外部网络
docker network create docker

# 后台启动
docker compose up -d

# 查看运行状态
docker compose ps

# 实时查看日志
docker compose logs -f clickhouse

# 进入容器执行查询
docker exec -it clickhouse clickhouse-client
```

连接验证：

```sql
-- 查看版本
SELECT version();

-- 查看数据库列表
SHOW DATABASES;
```

| 地址 | 说明 |
|------|------|
| `http://<host>:8123` | HTTP 接口 / Web UI（Play UI） |
| `<host>:9000` | Native TCP 接口（clickhouse-client / SDK） |

---

## 3. 生产优化建议 {#production}

| 项目 | 建议 |
|------|------|
| **数据目录** | 将 `./data` 挂载到独立高速数据盘，如 `/mnt/data/clickhouse` |
| **内存控制** | 在 `config.xml` 中设置 `max_server_memory_usage_to_ram_ratio` 限制内存上限 |
| **日志级别** | 生产环境建议将日志级别设为 `warning`，减少 I/O 开销 |
| **用户鉴权** | 通过 `users.d/` 配置专属账号，禁用默认 `default` 无密码访问 |
| **镜像版本** | 锁定具体版本号，避免 `latest` 引入破坏性更新 |
| **ulimits** | 确保宿主机 `nofile` 不低于 262144，避免高并发下 `Too many open files` |
