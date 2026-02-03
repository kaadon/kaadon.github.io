# <center>webrtc搭建</center>


## 部署WebRtc
### 1. 安装依赖
```shell
    ## Ubuntu
    sudo apt-get install libssl-dev libglib2.0-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libnice-dev libsrtp2-dev libusrsctp-dev libjson-glib-dev libjson-c-dev libcurl4-openssl-dev libwebsockets-dev
    ## Centos
    yum install git && yum install gcc && yum install gcc-c++ && yum install openssl && yum install openssl-devel && yum install libevent2 && yum install libevent-devel
```
### 2. 编译安装
```shell
  ## 下载
  wget https://github.com/coturn/coturn/archive/4.5.1.1.tar.gz
  tar -zxvf 4.5.1.1.tar.gz && cd coturn-4.5.1.1 && ./configure && make && make install
 
```
### 3. 配置
```shell
    cp /usr/local/etc/turnserver.conf.default /usr/local/etc/turnserver.conf
    ## 1. 编辑配置文件
    vi /usr/local/etc/turnserver.conf
```
### 4. 配置信息
```text
listening-port=3478
listening-ip=【你的centos服务器局域网ip】
listening-device=eth0
tls-listening-port=5349
external-ip=【你的外部ip】
user=admin_test:123456
cli-password=123456
log-file=/app/logs/turn.log
pidfile=/app/logs/pid_turnserver
```

### 5. 生成证书
```shell
    cd /usr/local/etc/
    openssl req -x509 -newkey rsa:2048 -keyout /usr/local/etc/turn_server_pkey.pem -out /usr/local/etc/turn_server_cert.pem -days 99999 -nodes
```

### 6. 启动
```shell
    urnserver -o -a -f -v -r shenzhen -user=admin_test:123456 -c /usr/local/etc/turnserver.conf
```


