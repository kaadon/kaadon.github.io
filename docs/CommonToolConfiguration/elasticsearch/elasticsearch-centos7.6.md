# <center>CENTOS7.6 Elasticsearch安装</center>

## 一、 Elasticsearch 7.x 安装

###  1.1安装es
```shell
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```
### 1.2配置yum源
```shell
vi /etc/yum.repos.d/elasticsearch.repo
#插入下面代码
    [elasticsearch-7.x]
    name=Elasticsearch repository for 7.x packages
    baseurl=https://artifacts.elastic.co/packages/7.x/yum
    gpgcheck=1
    gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
    enabled=1
    autorefresh=1
    type=rpm-md
#shift+：  输入wq回车保存 
```
### 1.3 安装 Elasticsearch 7.x
```shell
yum install elasticsearch
```

### 1.4 启动 Elasticsearch
```shell
service elasticsearch start
```
