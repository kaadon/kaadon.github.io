# <center>常用nginx配置</center>

## 获取真实IP
```nginx
   if ( $proxy_add_x_forwarded_for ~ (\d+)\.(\d+)\.(\d+)\.(\d+),(.*) ){
      set $XRealIP $1.$2.$3.$4;
   }
   if ($XRealIP = ""){
      set $XRealIP $remote_addr;
   }
```

## 禁用部分目录访问
 ```nginx
    #必须放在解析PHP之前
    location ~* ^/(upload|images)/.*.(php|php5|php7|php8)$
    {
      default_type application/json; 
      return 200 '{"message","You are definitely a particularly bad big fool."}'; 
    }
 ```

## 禁用后缀访问
```nginx
   location ~* ^/(app|application|extend|public|runtime|static|thinkphp|vendor)/.*.(php|php5|php7|php8)$ {
        default_type application/json; 
        return 200 '{"message","You are definitely a particularly bad big fool."}'; 
   }
```

## 禁用根目录文件后缀的访问
```nginx
   location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
   {
     default_type application/json; 
     return 200 '{"message","You are definitely a particularly bad big fool."}'; 
   }
```


## 反向代理
```nginx
   if ( $proxy_add_x_forwarded_for ~ (\d+)\.(\d+)\.(\d+)\.(\d+),(.*) ){
      set $XRealIP $1.$2.$3.$4;
   }
   if ($XRealIP = ""){
      set $XRealIP $remote_addr;
   }
   location ~ ^/(admin|static|upload) {
      proxy_connect_timeout 60;
      proxy_read_timeout    60;
      proxy_send_timeout    60;        
      proxy_redirect off;
      proxy_set_header Upgrade $http_upgrade; 
      proxy_set_header Scheme $scheme;
      proxy_set_header Connection "upgrade";
      proxy_set_header X-Real-IP $XRealIP;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Nginx-Proxy true;
      proxy_cache_bypass $http_upgrade;
      proxy_pass http://127.0.0.1:9087;
   }
```


## 多目录配置

```nginx
    #nginx修改root映射
    location /image {
    root /folderName;
    }
    
    #通过nginx rewrite内部跳转实现访问重定向
    location /image {
    rewrite ^/image/(.*)$  /folderName/image/$1 last;
    }
    
    #nginx设置别名alias映射实现
    location /image {
    alias /folderName/image; #这里写绝对路径
    }
    
    #通过nginx的permanent 301绝对跳转实现
    location /image {
    rewrite ^/image/(.*)$ http://dashidan.com/folderName/image/$1;
    }
    
    #通过判断uri实现页面跳转
    if ( $request_uri ~* ^(/image)){
    rewrite ^/image/(.*)$ /folderName/image/$1 last;
    }
    
    #通过跳转
    location ~ ^/?$ {
    rewrite ^ /web_a permanent;
    }
    
    location = / {
    # 只匹配"/".
    [ configuration A ] 
    }
    
    location / {
    # 匹配任何请求，因为所有请求都是以"/"开始
    # 但是更长字符匹配或者正则表达式匹配会优先匹配
    [ configuration B ] 
    }
    
    location ^~ /images/ {
    # 匹配任何以 /images/ 开始的请求，并停止匹配 其它location
    [ configuration C ] 
    }
    
    location ~* \.(gif|jpg|jpeg)$ {
    # 匹配以 gif, jpg, or jpeg结尾的请求. 
    # 但是所有 /images/ 目录的请求将由 [Configuration C]处理. 
    [ configuration D ] 
    }
```

## 跨域配置
```nginx

    #   指定允许跨域的方法，*代表所有
    add_header Access-Control-Allow-Methods *;
    
    #   预检命令的缓存，如果不缓存每次会发送两次请求
    add_header Access-Control-Max-Age 3600;
    
    #   带cookie请求需要加上这个字段，并设置为true
    add_header Access-Control-Allow-Credentials true;
    
    #   表示允许这个域跨域调用（客户端发送请求的域名和端口） 
    #   $http_origin动态获取请求客户端请求的域   不用*的原因是带cookie的请求不支持*号
    add_header Access-Control-Allow-Origin *;
    
    #   表示请求头的字段 动态获取
    add_header Access-Control-Allow-Headers $http_access_control_request_headers;
    
    #   检查请求的类型是不是预检命令
    if ($request_method = OPTIONS){
     return 200;
    }
```

## 负载均衡配置
1. 配置upstream
```nginx
    upstream webservers {
        server 10.190.0.6:9087 weight=3;
        server 10.190.0.7:9087 weight=3;
    }
```

2. 配置 Location
```nginx
    location ~ ^/ {
        proxy_connect_timeout 60;
        proxy_read_timeout    60;
        proxy_send_timeout    60;        
        proxy_redirect off;
        proxy_set_header Upgrade $http_upgrade; 
        proxy_set_header Scheme $scheme;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Nginx-Proxy true;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://webservers;
    }
```

## nginx日志
```nginx
    if ( $proxy_add_x_forwarded_for ~ (\d+)\.(\d+)\.(\d+)\.(\d+),(.*) ){
      set $real_ip_address $1.$2.$3.$4;
    }
    
    log_format  log_api  '$real_ip_address - $remote_addr - $remote_user [$request_time $upstream_response_time] [$time_local] "$request" '
                         '$status $body_bytes_sent "$http_referer" '
                         '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  logs/access.log  log_api;
    
    log_format  api_format    '$remote_addr - $remote_user [$request_time $upstream_response_time] [$time_local] "$request" '
                              '$status $body_bytes_sent "$http_referer" '
                              '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  logs/access.log  main;
```







   
