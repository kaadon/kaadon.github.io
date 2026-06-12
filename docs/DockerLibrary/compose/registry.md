# Docker Registry 部署文档

> **Docker Registry** 是官方私有镜像仓库，用于在内网存储和分发 Docker 镜像，避免依赖公共 Docker Hub。

---

## 目录

- [1. Compose 配置](#compose)
- [2. 生成 htpasswd 认证文件](#auth)
- [3. 启动与验证](#startup)
- [4. Nginx 反向代理](#nginx)
- [5. 生产优化建议](#production)

---

## 1. Compose 配置 {#compose}

```yaml
services:
  registry:
    image: registry:latest
    container_name: registry
    restart: always
    ports:
      - "5000:5000"
    environment:
      REGISTRY_HTTP_ADDR: "0.0.0.0:5000"
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /var/lib/registry
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: "Kaadon Registry"
    volumes:
      - ./data:/var/lib/registry
      - ./auth:/auth
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
          memory: 256M

networks:
  docker:
    external: true
```

---

## 2. 生成 htpasswd 认证文件 {#auth}

Registry 使用 `htpasswd` 进行 HTTP Basic 认证，需提前生成密码文件：

```bash
# 创建 auth 目录
mkdir -p ./auth

# 生成 htpasswd 文件（首次创建用 -Bc，追加用户用 -Bb）
docker run --rm --entrypoint htpasswd httpd:2 \
  -Bc /tmp/htpasswd admin your_password

# 将生成的内容写入本地文件
docker run --rm --entrypoint htpasswd httpd:2 \
  -Bc - admin your_password > ./auth/htpasswd
```

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
docker compose logs -f registry
```

推送与拉取镜像验证：

```bash
# 登录私有仓库
docker login 127.0.0.1:5000

# 打标签
docker tag nginx:latest 127.0.0.1:5000/nginx:latest

# 推送镜像
docker push 127.0.0.1:5000/nginx:latest

# 拉取镜像
docker pull 127.0.0.1:5000/nginx:latest

# 查看仓库中的镜像列表（API）
curl -u admin:your_password http://127.0.0.1:5000/v2/_catalog
```

---

## 4. Nginx 反向代理 {#nginx}

通过 Nginx 代理并终止 TLS，客户端可使用域名访问：

```nginx
location / {
    proxy_pass                         http://127.0.0.1:5000;
    proxy_set_header Host              $http_host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # 透传 Authorization 头（Basic 认证必需）
    proxy_set_header Authorization     $http_authorization;

    # 防止大镜像推送中断
    client_max_body_size    0;
    proxy_request_buffering off;
    chunked_transfer_encoding on;

    proxy_http_version  1.1;
    proxy_read_timeout  900;
}
```

配置 HTTPS 后，客户端无需添加 `--insecure-registries`，直接使用域名即可。

---

## 5. 生产优化建议 {#production}

| 项目 | 建议 |
|------|------|
| **认证安全** | 使用强密码生成 `htpasswd`，定期轮换 |
| **HTTPS** | 通过 Nginx 反向代理终止 TLS，避免明文传输镜像层和凭证 |
| **存储后端** | 大规模场景建议将存储后端改为 S3 / OSS，避免本地磁盘成为瓶颈 |
| **镜像清理** | 定期执行 `registry garbage-collect` 清理已删除镜像的残留 layer |
| **镜像版本** | 锁定具体版本号，避免 `latest` 引入破坏性更新 |
| **网络隔离** | 仅在内网暴露 5000 端口，对外通过 Nginx + HTTPS 域名访问 |
