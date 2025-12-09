# <center> php-nginx 构建示例 </center>

## 1 . 示例 Dockerfile 文件
```shell
FROM docker.boolcdn.net/php-nginx:8.1-alpine

# 🔹🔹🔹 设置工作目录
WORKDIR /app

# 🔹🔹🔹 复制应用代码到 /app 目录
COPY . /app

# 🔹🔹🔹 判断 /app/.env 文件是否存在，若不存在则复制 .env.example 为 .env,设置 root:root 权限为 664
RUN if [ ! -f /app/.env ]; then cp /app/.env.example /app/.env; fi && \
    chown root:root /app/.env && chmod 664 /app/.env

# 🔹🔹🔹 判断 /app/runtime 目录是否存在，若不存在则创建,设置 application:application 权限为 755
RUN if [ ! -d /app/runtime ]; then mkdir -p /app/runtime; fi && \
    chown -R application:application /app/runtime && chmod -R 755 /app/runtime

# 🔹🔹🔹 判断 /app/public/storage 目录是否存在，若不存在则创建,设置 application:application 权限为 755
RUN if [ ! -d /app/public/storage ]; then mkdir -p /app/public/storage; fi && \
    chown -R application:application /app/public/storage && chmod -R 755 /app/public/storage

# 🔹🔹🔹 复制所有配置文件
COPY docker/project-entrypoint.sh /usr/local/bin/project-entrypoint.sh

# 🔹🔹🔹  复制 Nginx 虚拟主机配置文件
COPY docker/nginx/vhost.conf /opt/docker/etc/nginx/vhost.conf

# 🔹🔹🔹 设置脚本执行权限
RUN chmod +x /usr/local/bin/project-entrypoint.sh

# 🔹🔹🔹 复制 supervisord 配置文件
COPY docker/supervisord/*.conf /opt/docker/etc/supervisor.d/

# 🔹🔹🔹 复制 crontab Dockerfile
#COPY docker/crontab /tmp/crontab

# 🔹🔹🔹 设置 crontab
#RUN cat /tmp/crontab && \
#    crontab -u application /tmp/crontab && \
#    crontab -u application -l && \
#    rm /tmp/crontab

# 🔹🔹🔹 设置自定义 entrypoint
ENTRYPOINT ["/usr/local/bin/project-entrypoint.sh"]

# 🔹🔹🔹 设置默认命令为启动 supervisord
CMD ["/entrypoint","supervisord"]

```

## 2 . entrypoint
```shell
#!bin/bash
set -e

echo "🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹"
echo "🔹🔸🔸🔸🔸🔸🔸🔸 $(date)🔸🔸🔸🔸🔸🔸🔸🔸🔹"
echo "🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹"

echo "🔸🔸🔸🔸create directory 🔸🔸🔸🔸"

BASE_DIR="/app"

for dir in "runtime" "public/storage"
do
  TARGET="$BASE_DIR/$dir"

  echo "🔸 目录检查：$TARGET"
  if [ ! -d "$TARGET" ]; then
    echo "🔸 创建目录: $TARGET"
    mkdir -p "$TARGET"
  fi

  echo "🔸 设置权限: $TARGET"
  chown -R application:application "$TARGET"
  chmod -R 755 "$TARGET"
done

echo "🔸🔸🔸🔸 Docker init end 🔸🔸🔸🔸"

exec "$@"
```

## 3 . nginx 配置文件
```nginx
server {
    listen 80;
    server_name _;

    root /app/public;
    index index.php index.html;
    # -------------------------------------
    # 🔹🔹🔹 反向代理 /app 请求
    # -------------------------------------
    ##  location ~ ^/app {
    ##      proxy_pass http://127.0.0.1:9090;
    ##      proxy_set_header Host $http_host;
    ##      proxy_set_header X-Real-IP $remote_addr;
    ##      proxy_set_header X-Real-Port $remote_port;
    ##      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    ##      proxy_set_header REMOTE-HOST $remote_addr;
    ##      proxy_connect_timeout 60s;
    ##      proxy_send_timeout 600s;
    ##      proxy_read_timeout 600s;
    ##      proxy_http_version 1.1;
    ##      proxy_set_header Upgrade $http_upgrade;
    ##      proxy_set_header Connection "upgrade";
    ##  }

    # -------------------------------------
    # 🔹🔹🔹 禁止目录执行php （放最前才能拦截）
    # -------------------------------------
    location ~* ^/(h5|guoqi|static|upload|img)/.*\.(php|php5|php7|php8)$ {
        default_type application/json;
        return 200 '{"message":"You are definitely a particularly bad big fool."}';
    }

    # -------------------------------------
    # 🔹🔹🔹 禁止访问隐藏/敏感文件
    # -------------------------------------
    location ~ ^/(\.user\.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README\.md)$ {
        return 404;
    }

    # -------------------------------------
    # 🔹🔹🔹 .well-known 基础访问(ssl)
    # -------------------------------------
    location ^~ /.well-known {
        allow all;
    }

    # -------------------------------------
    # 🔹🔹🔹 禁止执行敏感文件
    # -------------------------------------
    if ($uri ~ "^/\.well-known/.*\.(php|jsp|py|js|css|lua|ts|go|zip|tar\.gz|rar|7z|sql|bak)$") {
        return 403;
    }

    # -------------------------------------
    # 🔹🔹🔹 伪静态（必须在 PHP 解析前）示例为thinkphp
    # -------------------------------------
    location / {
        if (!-e $request_filename) {
            rewrite ^(.*)$ /index.php?s=$1 last;
            break;
        }
    }

    # -------------------------------------
    # 🔹🔹🔹 静态资源缓存
    # -------------------------------------
    location ~* \.(gif|jpg|jpeg|png|bmp|swf)$ {
        expires 30d;
        access_log off;
        error_log off;
    }

    location ~* \.(js|css)$ {
        expires 12h;
        access_log off;
        error_log off;
    }

    # -------------------------------------
    # 🔹🔹🔹 PHP 解析（永远放最后）
    # -------------------------------------
    include /opt/docker/etc/nginx/enable-php.conf;

    # 日志
    # -------------------------------------
    # 🔹🔹🔹 日志输出设置 cflog
    # -------------------------------------
    ## access_log /docker.stdout cflog;

    # -------------------------------------
    # 🔹🔹🔹 日志输出设置 default
    # -------------------------------------
    access_log /docker.stdout;

    # -------------------------------------
    # 🔹🔹🔹 错误日志
    # -------------------------------------
    error_log  /docker.stderr;
}

```

## 4. php
```nginx
    location ~ [^/]\.php(/|$)
    {
        try_files $uri =404;
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;

        fastcgi_param  SCRIPT_FILENAME    $document_root$fastcgi_script_name;
        fastcgi_param  QUERY_STRING       $query_string;
        fastcgi_param  REQUEST_METHOD     $request_method;
        fastcgi_param  CONTENT_TYPE       $content_type;
        fastcgi_param  CONTENT_LENGTH     $content_length;

        fastcgi_param  SCRIPT_NAME        $fastcgi_script_name;
        fastcgi_param  REQUEST_URI        $request_uri;
        fastcgi_param  DOCUMENT_URI       $document_uri;
        fastcgi_param  DOCUMENT_ROOT      $document_root;
        fastcgi_param  SERVER_PROTOCOL    $server_protocol;
        fastcgi_param  REQUEST_SCHEME     $scheme;
        fastcgi_param  HTTPS              $https if_not_empty;

        fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
        fastcgi_param  SERVER_SOFTWARE    nginx/$nginx_version;

        fastcgi_param  REMOTE_ADDR        $remote_addr;
        fastcgi_param  REMOTE_PORT        $remote_port;
        fastcgi_param  SERVER_ADDR        $server_addr;
        fastcgi_param  SERVER_PORT        $server_port;
        fastcgi_param  SERVER_NAME        $server_name;

        # PHP only, required if PHP was built with --enable-force-cgi-redirect
        fastcgi_param  REDIRECT_STATUS    200;

        set $real_script_name $fastcgi_script_name;
        if ($fastcgi_script_name ~ "^(.+?\.php)(/.+)$") {
        		set $real_script_name $1;
        		set $path_info $2;
         }
        fastcgi_param SCRIPT_FILENAME $document_root$real_script_name;
        fastcgi_param SCRIPT_NAME $real_script_name;
        fastcgi_param PATH_INFO $path_info;
    }
```

## 5 . supervisord 配置文件示例
```ini
[program:defaultExample]
command=php think queue:work --queue default
directory=/app
autorestart=true
startsecs=3
startretries=3
stdout_logfile=/app/runtime/supervisord-defaultExample.out.log
stderr_logfile=/app/runtime/supervisord-defaultExample.err.log
stdout_logfile_maxbytes=2MB
stderr_logfile_maxbytes=2MB
user=application
priority=999
numprocs=1
process_name=%(program_name)s_%(process_num)02d
```
## 6 . supervisord 配置文件安装
```text
[program:queueDefault]
command=php think queue:work
directory=/app
autorestart=true
startsecs=3
startretries=10
stdout_logfile=/app/runtime/supervisord-queueDefault.out.log
stderr_logfile=/app/runtime/supervisord-queueDefault.err.log
stdout_logfile_maxbytes=2MB
stderr_logfile_maxbytes=2MB
user=application
priority=999
numprocs=1
process_name=%(program_name)s_%(process_num)02d
```

## 7 . 定时任务配置文件示例
```text
# ============================================
# 示例
# ============================================
# * * * * * [command] >> /app/[path]/*.log 2>&1
```

## 8 . 生产环境 Docker Compose 示例
```yaml
services:
  eazyadmin:
    container_name: eazyadmin
    image: docker.boolcdn.net/eazyadmin:latest
    environment:
      - PHP_DATE_TIMEZONE=Asia/Shanghai
    ports:
      - "8080:80"
    volumes:
      - /www/docker/eazyadmin/_data:/app:ro
      - /www/docker/eazyadmin/_user_ini:/app/public/.user.ini:ro
      - /www/docker/eazyadmin/_env:/app/.env:ro
      - /www/docker/eazyadmin/_runtime:/app/runtime
      - /www/docker/eazyadmin/_upload:/app/public/upload
    networks:
      - docker
    restart: always
    deploy:
      resources:
        limits:
          cpus: "4.0"
          memory: 8gb
networks:
  docker:
    external: true
```

## 9 . 生产环境线上部署
```shell
#!/bin/bash
set -e
# 定义挂载根目录
BASE="/www/docker/eazyadmin/"
echo "🔹 使用挂载根目录：$MOUNT_DIR"

# 创建挂载目录
echo "🔹 创建挂载目录..."
for dir in _data _runtime _storage
do
    TARGET="$BASE/$dir"
    echo "🔸 创建目录：$TARGET"
    [ -d "$TARGET" ] || mkdir -p "$TARGET"

    if [ "$dir" = "_storage" ] || [ "$dir" = "_runtime" ]; then
        chown 1000:1000 "$TARGET"
        chmod 755 "$TARGET"
        if [ "$dir" = "_storage"  ]; then
            cp -rf ./public/storage/. "$TARGET/"
        fi
        if [ "$dir" = "_runtime" ]; then
          rm -rf "$TARGET/*"
        fi
    fi
    
    if [ "$dir" = "_data" ]; then
        cp -rf ./ "$TARGET/"
        echo "open_basedir=/app/:/tmp/" > "$TARGET/public/.user.ini"
    fi
done


# 创建挂载文件
echo "🔹 创建挂载文件..."
for file in _env _user_ini
do
    TARGET="$BASE/$file"
    echo "🔸 创建文件：$TARGET"
    if [ "$file" = "_user_ini" ]; then
        [ -f "$TARGET" ] || echo "open_basedir=/app/:/tmp/" > "$TARGET"
    fi

    if [ "$file" = "_env" ]; then
        [ -f "$TARGET" ] || cp "./.env.example" "$TARGET"
    fi
done

echo "🔹 构建并推送 Docker 镜像..."
docker build -t docker.boolcdn.net/eazyadmin:latest . --push

DOCKER_COMPOSE_FILE="docker-compose.yml"
SERVICE_NAME="eazyadmin"

echo "🔹 检查 $SERVICE_NAME 容器状态 ..."

if docker compose -f "$DOCKER_COMPOSE_FILE" ps -q "$SERVICE_NAME" >/dev/null 2>&1; then
    echo "🔹 $SERVICE_NAME 已存在，执行更新镜像并重启 ..."
    docker compose -f "$DOCKER_COMPOSE_FILE" pull "$SERVICE_NAME"
    docker compose -f "$DOCKER_COMPOSE_FILE" up -d --no-deps "$SERVICE_NAME"
else
    echo "🔹 $SERVICE_NAME 不存在，首次启动 ..."
    docker compose -f "$DOCKER_COMPOSE_FILE" up -d "$SERVICE_NAME"
fi
```


## 10 . 开发环境 Docker Compose 示例
```yaml
services:
  eazyadmin:
    container_name:  eazyadmin
    build:
      context: .
      dockerfile: Dockerfile
    image: docker.boolcdn.net/eazyadmin:dev
    environment:
      # 时区配置
      - PHP_DATE_TIMEZONE=Asia/Shanghai
      - APPLICATION_UID=501
      - APPLICATION_GID=20
    ports:
      - "8080:80"
    volumes:
      - /Volumes/SourceData/.codeData/git/git.boolcdn.net/Template/EasyAdmin8:/app
    networks:
      - docker
    restart: always
    deploy:
      resources:
        limits:
          cpus: "3.0"
          memory: 6gb
    logging:
      driver: json-file
      options:
        max-size: "2m"
        max-file: "100"
networks:
  docker:
    external: true
```

## 11 . 开发环境启动脚本
```shell
docker-compose -f docker-dev.yml up -d --build eazyadmin
```


