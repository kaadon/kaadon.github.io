# Gitea 部署文档

> **Gitea** 是轻量级自托管 Git 服务，支持仓库管理、Issue、PR、CI/CD 等功能，资源占用极低。

---

## 目录

- [1. Compose 配置](#compose)
- [2. 启动与验证](#startup)
- [3. Nginx 反向代理](#nginx)
- [4. 生产优化建议](#production)

---

## 1. Compose 配置 {#compose}

```yaml
services:
  gitea:
    image: gitea/gitea:latest
    container_name: gitea
    restart: always
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - USER=git
      - GITEA__database__DB_TYPE=mysql
      - GITEA__database__HOST=10.0.0.1:3306
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=gitea   # 替换为强密码
      - GITEA_CUSTOM=/data/gitea
      - DISABLE_REGISTRATION=true       # 禁止公开注册
    ports:
      - "3000:3000"   # Web UI / HTTP API
      - "22:22"       # SSH 推送
    volumes:
      - ./data:/data
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
          memory: 256M

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
docker compose logs -f gitea
```

| 地址 | 说明 |
|------|------|
| `http://<host>:3000` | Web 管理界面 |
| `<host>:22` | SSH 推送地址 |

首次访问会进入安装向导，完成数据库配置后即可使用。

---

## 3. Nginx 反向代理 {#nginx}

```nginx
location ^~ / {
    proxy_pass                         http://127.0.0.1:3000;
    proxy_set_header Host              $http_host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # 透传 Authorization 头（Git HTTP 认证必需）
    proxy_set_header Authorization     $http_authorization;

    # 防止大仓库推送中断
    client_max_body_size    0;
    proxy_request_buffering off;
    chunked_transfer_encoding on;

    # 长连接优化
    proxy_http_version  1.1;
    proxy_read_timeout  900;
}
```

---

## 4. 生产优化建议 {#production}

| 项目 | 建议 |
|------|------|
| **数据库密码** | 修改 `GITEA__database__PASSWD`，避免使用弱密码 |
| **禁止注册** | 已设置 `DISABLE_REGISTRATION=true`，防止未授权用户注册 |
| **SSH 端口** | 若宿主机 22 端口已被占用，可改为 `2222:22`，并在 Gitea 配置中同步修改 SSH 端口 |
| **数据目录** | 将 `./data` 挂载到独立磁盘，定期备份 |
| **HTTPS** | 通过 Nginx 反向代理终止 TLS，Gitea 配置中设置 `ROOT_URL` 为 HTTPS 地址 |
| **镜像版本** | 锁定具体版本号，避免 `latest` 引入破坏性更新 |
