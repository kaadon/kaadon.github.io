# <center> mysql 部署 </center>

## 1 . Compose 安装 mysql:5.6
```text
services:
  mysql:
    image: mysql:5.6
    container_name: mysql56
    ports:
      - "65306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: docker
      MYSQL_PASSWORD: docker
    volumes:
      - /www/docker/mysql56Data:/var/lib/mysql
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

