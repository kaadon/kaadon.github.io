# <center> Dockerfile </center>

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
[ ! -d /app/langCache ] && mkdir -p /app/langCache
chown -R application:application /app/runtime /app/public/storage /app/langCache
chmod -R 755 /app/runtime /app/public/storage /app/langCache

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


