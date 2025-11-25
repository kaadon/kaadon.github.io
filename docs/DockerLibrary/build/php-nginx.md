# <center> php-nginx 构建示例 </center>

## 1 . 示例 Dockerfile 文件
```shell
FROM docker.boolcdn.net/php-nginx:8.1-alpine

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . /app

# 复制 Nginx 配置文件
COPY docker/nginx/enable-php.conf /opt/docker/etc/nginx/enable-php.conf
COPY docker/nginx/vhost.conf /opt/docker/etc/nginx/vhost.conf

# 复制 supervisord 配置文件
COPY docker/supervisord/*.conf /opt/docker/etc/supervisor.d/

# 复制自定义 entrypoint 脚本
COPY docker/project-entrypoint.sh /usr/local/bin/project-entrypoint.sh

# 添加可执行权限
RUN chmod +x /usr/local/bin/project-entrypoint.sh

ENV WEB_DOCUMENT_ROOT=/app/public \
    PHP_DISPLAY_ERRORS=0 \
    PHP_MEMORY_LIMIT=512M \
    PHP_MAX_EXECUTION_TIME=300 \
    PHP_POST_MAX_SIZE=50M \
    PHP_UPLOAD_MAX_FILESIZE=50M 

# 设置自定义 entrypoint
ENTRYPOINT ["/usr/local/bin/project-entrypoint.sh"]

CMD ["/entrypoint","supervisord"]
```

## 2 . entrypoint
```shell
#!/bin/sh
#!/bin/sh
set -e

echo "Setting up directory permissions...🚀🚀🚀"
[ ! -d /app/runtime ] && mkdir -p /app/runtime
[ ! -d /app/public/upload ] && mkdir -p /app/public/upload
chown -R application:application /app/runtime /app/public/upload
chmod -R 755 /app/runtime /app/public/upload
# shellcheck disable=SC2028
echo "Directory permissions set. ✅✅✅\n"

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
    # 禁止目录执行php （放最前才能拦截）
    # -------------------------------------
    location ~* ^/(h5|guoqi|static|upload|img)/.*\.(php|php5|php7|php8)$ {
        default_type application/json;
        return 200 '{"message":"You are definitely a particularly bad big fool."}';
    }

    # -------------------------------------
    # 禁止访问隐藏/敏感文件
    # （放前面才不会被 location / 吃掉）
    # -------------------------------------
    location ~ ^/(\.user\.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README\.md)$ {
        return 404;
    }

    # -------------------------------------
    # .well-known 基础访问
    # -------------------------------------
    location ^~ /.well-known {
        allow all;
    }

    # -------------------------------------
    # .well-known 禁止执行敏感文件
    # （if 必须放 server {} 内，不可放 location 下）
    # -------------------------------------
    if ($uri ~ "^/\.well-known/.*\.(php|jsp|py|js|css|lua|ts|go|zip|tar\.gz|rar|7z|sql|bak)$") {
        return 403;
    }

    # -------------------------------------
    # 伪静态（必须在 PHP 解析前）
    # -------------------------------------
    location / {
        if (!-e $request_filename) {
            rewrite ^(.*)$ /index.php?s=$1 last;
            break;
        }
    }

    # -------------------------------------
    # 静态资源缓存
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
    # PHP 解析（永远放最后）
    # -------------------------------------
    include /opt/docker/etc/nginx/enable-php.conf;

    # 日志
    access_log /docker.stdout;
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
```shell
# 复制 supervisord 配置文件
COPY docker/supervisord/*.conf /opt/docker/etc/supervisor.d/
```

## 7 . 定时任务配置文件示例
```text
# 每分钟执行 think InterestTreasure
* * * * * cd /app && /usr/local/bin/php /app/think defaultCrontab >> /app/runtime/log/crontab-defaultCrontab-log.log 2>&1
```

## 8. contrab 配置文件添加方法
```shell
# 复制 crontab Dockerfile 配置并安装
COPY docker/crontab /tmp/crontab
RUN cat /tmp/crontab && \
    crontab -u application /tmp/crontab && \
    crontab -u application -l && \
    rm /tmp/crontab
```


