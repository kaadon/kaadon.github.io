# <center> Gitea部署 </center>

## 1 . Compose 安装Gitea
```text
services:
  gitea:
    image: gitea/gitea:latest
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=mysql
      - GITEA__database__HOST=10.0.0.1:3306
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=gitea
      - GITEA_CUSTOM=/data/gitea
      - USER=git
      - DISABLE_REGISTRATION=true
    ports:
      - "3000:3000"
      - "22:22"
    volumes:
      - /www/docker/volumes/gitea/_data:/data
    restart: always
    networks:
      docker:
        ipv4_address: 10.0.0.3
    deploy:
      resources:
        limits:
          cpus: "4.0"
          memory: 8gb
    cpus: "4.0"
    mem_limit: 8gb
networks:
  docker:
    external: true
```

## 2 . 反向代理配置
```nginx
    #PROXY-CONF-START
    location ^~ / {
        proxy_pass                          http://127.0.0.1:5000;
        proxy_set_header Host               $http_host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;

        # ✅ 必须添加：透传 Docker 的 Authorization 头
        proxy_set_header Authorization      $http_authorization;

        # ✅ 防止上传中断（尤其是大镜像）
        client_max_body_size 0;
        proxy_request_buffering off;
        chunked_transfer_encoding on;

        # 可选：长连接优化
        proxy_http_version 1.1;
        proxy_read_timeout 900;
      
    }
    #PROXY-CONF-END
```
