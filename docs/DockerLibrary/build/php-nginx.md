# <center> php-nginx 构建示例 </center>

## 1 . 示例 Dockerfile 文件
```shell
FROM webdevops/php-nginx:8.1-alpine
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
COPY docker/entrypoint.sh /usr/local/bin/custom-entrypoint.sh
# 安装时区数据并给脚本添加可执行权限
RUN apk add --no-cache tzdata && \
    chmod +x /usr/local/bin/custom-entrypoint.sh

# 设置环境变量
ENV SERVER_DATE_TIMEZONE=Asia/Shanghai

ENV WEB_DOCUMENT_ROOT=/app/public \
    PHP_DISPLAY_ERRORS=0 \
    PHP_MEMORY_LIMIT=512M \
    PHP_MAX_EXECUTION_TIME=300 \
    PHP_POST_MAX_SIZE=50M \
    PHP_UPLOAD_MAX_FILESIZE=50M \
    PHP_DATE_TIMEZONE=${SERVER_DATE_TIMEZONE}
# 声明容器对外暴露的端口
EXPOSE 80
# 设置自定义 entrypoint
ENTRYPOINT ["/usr/local/bin/custom-entrypoint.sh"]
```

## 2 . entrypoint
```shell
#!/bin/sh
set -e

cp /usr/share/zoneinfo/${SERVER_DATE_TIMEZONE:-Asia/Shanghai} /etc/localtime

echo "${SERVER_DATE_TIMEZONE:-Asia/Shanghai}" > /etc/timezone

# 动态设置 PHP_DATE_TIMEZONE 与 SERVER_DATE_TIMEZONE 保持一致（运行时生效）
export PHP_DATE_TIMEZONE=${SERVER_DATE_TIMEZONE:-Asia/Shanghai}

date

# 根据环境变量生成 .env 文件
cat > /app/.env <<EOF
[APP]
DEBUG=${APP_DEBUG:-false}
TIMEZONE=${SERVER_DATE_TIMEZONE:-Asia/Shanghai}

[DATABASE]
DEBUG=${DATABASE_DEBUG:-false}
TYPE=${DATABASE_TYPE:-mysql}
HOSTNAME=${DATABASE_HOSTNAME:-10.0.0.1}
DATABASE=${DATABASE_DATABASE:-authapi}
USERNAME=${DATABASE_USERNAME:-authapi}
PASSWORD=${DATABASE_PASSWORD:-authapi}
CHARSET=${DATABASE_CHARSET:-utf8mb4}
HOSTPORT=${DATABASE_HOSTPORT:-3306}
PREFIX=${DATABASE_PREFIX:-ka_}

[REDIS]
HOSTNAME=${REDIS_HOSTNAME:-10.0.0.1}
PASSWORD=${REDIS_PASSWORD:-123456}
SELECT=${REDIS_SELECT:-0}
PORT=${REDIS_PORT:-6379}
PREFIX=${REDIS_PREFIX:-tpAuthapi:}
TAGPREFIX=${REDIS_TAGPREFIX:-tpAuthapiTag:}

[KAADON]
TRANSLATE_KEY=${KAADON_TRANSLATE_KEY:-AIzaSyAPMBFS_xQ79RzMICQBfRCKbAPjPggvSx0}
GMAIL_USERNAME=${KAADON_GMAIL_USERNAME:-authapi.vip@gmail.com}
GMAIL_PASSWORD=${KAADON_GMAIL_PASSWORD:-pxtihxjdhqglkgfd}

[LANG]
DEFAULT_LANG=${LANG_DEFAULT_LANG:-zh-cn}

[FRONT]
PROJECT_NAME=${FRONT_PROJECT_NAME:-tpAuthapi}

EOF

echo "Generated .env file:"
cat /app/.env

# 设置运行时目录权限（适用于 volumes 挂载场景）
echo "Setting up directory permissions..."
[ ! -d /app/runtime ] && mkdir -p /app/runtime
[ ! -d /app/public/storage ] && mkdir -p /app/public/storage
chown -R application:application /app/runtime /app/public/storage
chmod -R 755 /app/runtime /app/public/storage

# 创建 .user.ini 文件设置 PHP open_basedir 安全限制
if [ ! -f /app/public/.user.ini ]; then
    echo "Creating .user.ini for PHP security..."
    if [ -w /app/public ]; then
        cat > /app/public/.user.ini <<EOF
open_basedir=/app/:/tmp/
EOF
        chmod 644 /app/public/.user.ini 2>/dev/null || true
        echo ".user.ini created successfully"
    else
        echo "Warning: Cannot write to /app/public, skipping .user.ini creation"
    fi
else
    echo ".user.ini already exists, skipping creation"
fi

# 执行原始镜像的入口点（webdevops 镜像使用 supervisord）
exec /entrypoint supervisord
```

## 3 . nginx 配置文件
```nginx
server
{
    listen 80;
    server_name _;

    root /app/public;
    index index.php index.html;

    #必须放在解析PHP之前
    #禁止目录执行php SATRT
    location ~* ^/(manage|storage)/.*\.(php|php5|php7|php8)$ {
        default_type application/json;
        return 200 '{"message":"You are definitely a particularly bad big fool."}';
    }
    #禁止目录执行php END

    include /opt/docker/etc/nginx/enable-php.conf;

    location / {
        if (!-e $request_filename){
            rewrite  ^(.*)$  /index.php?s=$1  last;   break;
        }
    }

    location ~ ^/(\.user.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }

    location ~ \.well-known{
        allow all;
    }
    if ( $uri ~ "^/\.well-known/.*\.(php|jsp|py|js|css|lua|ts|go|zip|tar\.gz|rar|7z|sql|bak)$" ) {
        return 403;
    }
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
        error_log /dev/null;
        access_log /dev/null;
    }

    location ~ .*\.(js|css)?$
    {
        expires      12h;
        error_log /dev/null;
        access_log /dev/null;
    }
    # 访问日志
    access_log /docker.stdout;
    error_log /docker.stderr;
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
[program:queueAppInfo]
command=php think queue:work --queue appinfo
directory=/app
autorestart=true
startsecs=3
startretries=3
stdout_logfile=/app/runtime/supervisord-queueAppInfo.out.log
stderr_logfile=/app/runtime/supervisord-queueAppInfo.err.log
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
# 每分钟执行 start.sh
* * * * * /bin/sh /app/public/start.sh >> /app/runtime/log/start_log.log 2>&1

# 每分钟执行 think InterestTreasure
* * * * * cd /app && /usr/local/bin/php /app/think InterestTreasure >> /app/runtime/log/InterestTreasure_log.log 2>&1
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


