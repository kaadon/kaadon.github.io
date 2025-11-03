# <center> elasticsearch 部署 </center>

## 1 . Compose 安装 elasticsearch:7.17.28
```text

services:
  elasticsearch:
    image: elasticsearch:7.17.28
    container_name: elasticsearch
    environment:
      - cluster.name=es-single
      - node.name=es-node-1
      - discovery.type=single-node
      - network.host=0.0.0.0
      - http.port=9200
      - bootstrap.memory_lock=true
      - ES_JAVA_OPTS=-Xms8g -Xmx8g
      - xpack.security.enabled=false
      - xpack.security.http.ssl.enabled=false
      - xpack.security.transport.ssl.enabled=false
      - xpack.ml.enabled=false               # 🚨 关键参数，必须加
      - xpack.monitoring.collection.enabled=false # 建议附带关闭监控模块
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - /www/docker/easysearchData/_data:/usr/share/elasticsearch/data
      - /www/docker/easysearchData/_logs:/usr/share/elasticsearch/logs
    ports:
      - "9200:9200"
      - "9300:9300"
    networks:
      - docker
    restart: always

networks:
  docker:
    external: true
```

