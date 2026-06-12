# MySQL 部署文档

> **MySQL** 是最流行的开源关系型数据库，适用于 Web 应用、微服务及各类业务数据存储场景。

---

## 目录

- [1. Compose 配置](#compose)
- [2. 启动与验证](#startup)
- [3. 生产优化建议](#production)

---

## 1. Compose 配置 {#compose}

```yaml
services:
  mysql:
    image: mysql:5.6
    container_name: mysql56
    restart: always
    ports:
      - "65306:3306"   # 映射到非标准端口，降低暴露风险
    environment:
      MYSQL_ROOT_PASSWORD: "your_root_password"   # 替换为强密码
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: docker
      MYSQL_PASSWORD: "your_user_password"        # 替换为强密码
    volumes:
      - ./data:/var/lib/mysql
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
          memory: 512M

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
docker compose logs -f mysql56
```

连接验证：

```bash
# 进入容器连接 MySQL
docker exec -it mysql56 mysql -uroot -p

# 或通过宿主机客户端连接
mysql -h 127.0.0.1 -P 65306 -uroot -p
```

```sql
-- 查看版本
SELECT VERSION();

-- 查看数据库列表
SHOW DATABASES;
```

---

## 3. 生产优化建议 {#production}

| 项目 | 建议 |
|------|------|
| **账号安全** | 修改 `MYSQL_ROOT_PASSWORD` 与 `MYSQL_PASSWORD`，避免弱密码 |
| **数据目录** | 将 `./data` 挂载到独立数据盘，定期备份 |
| **版本升级** | MySQL 5.6 已停止官方支持，建议升级至 8.0 LTS |
| **字符集** | 启动参数添加 `--character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci` |
| **慢查询日志** | 开启 `slow_query_log` 监控慢 SQL，阈值建议 1s |
| **端口暴露** | 生产环境不建议对外暴露数据库端口，通过内部网络访问 |
