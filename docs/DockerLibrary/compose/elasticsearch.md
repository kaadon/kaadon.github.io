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
      - ES_JAVA_OPTS=-Xms4g -Xmx4g
      - xpack.security.enabled=false
      - xpack.security.http.ssl.enabled=false
      - xpack.security.transport.ssl.enabled=false
      - ingest.geoip.downloader.enabled=false
      - logger.level=WARN
      - xpack.ml.enabled=false
      - xpack.monitoring.collection.enabled=false
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - /www/docker/easysearchData/_data:/usr/share/elasticsearch/data
      - /www/docker/easysearchData/_log:/usr/share/elasticsearch/logs
    ports:
      - "9200:9200"
      - "9300:9300"
    networks:
      - docker
    restart: always
    deploy:
      resources:
        limits:
          cpus: "4.0"
          memory: 8gb
    logging:
      driver: json-file
      options:
        max-size: "2m"
        max-file: "10"

networks:
  docker:
    external: true
```
## 2 . elasticsearch 配置文件env
```dotenv
cluster.name=es-single
node.name=es-node-1
discovery.type=single-node
network.host=0.0.0.0
http.port=9200
bootstrap.memory_lock=true
ES_JAVA_OPTS=-Xms2g -Xmx7g
xpack.security.enabled=false
xpack.security.http.ssl.enabled=false
xpack.security.transport.ssl.enabled=false
xpack.ml.enabled=false
xpack.monitoring.collection.enabled=false
```

