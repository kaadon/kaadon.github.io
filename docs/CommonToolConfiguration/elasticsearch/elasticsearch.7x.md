# <center>Elasticsearch安装</center>

## 一、 Elasticsearch 7.x (CENTOS7.6)安装

### 1.1安装es

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

### 1.5 验证 Elasticsearch 是否安装成功

```shell
curl -X GET "localhost:9200/"
```

## 二、 Elasticsearch 7.x (UNBUTU22.04)安装

### 2.1安装es

```shell
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
```

### 2.2配置apt源

```shell
sudo sh -c 'echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list'
sudo apt-get update
```

### 2.3 安装 Elasticsearch 7.x

```shell
sudo apt-get install elasticsearch
```

### 2.4 启动 Elasticsearch

```shell
sudo systemctl start elasticsearch
sudo systemctl enable elasticsearch
```

### 2.5 验证 Elasticsearch 是否安装成功

```shell
curl -X GET "localhost:9200/"
```





