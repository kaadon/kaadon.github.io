# <center> registry部署 </center>

## 1 . Compose 安装 registry
```text
services:
  gitea:
    image: registry:latest
    container_name: registry
    ports:
      - "5000:5000"
    environment:
      REGISTRY_HTTP_ADDR: 0.0.0.0:5000
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /var/lib/registry
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: "Kaadon Registry"
    volumes:
      - /www/docker/volumes/registryData/_data:/var/lib/registry
      - /www/docker/volumes/registryData/_auth:/auth
    restart: always
    networks:
      - gitea-net
    deploy:
      resources:
        limits:
          cpus: "4.0"
          memory: 8gb
    cpus: "4.0"
    mem_limit: 8gb
networks:
  gitea-net:
    driver: bridge
    name: gitea-net
```

