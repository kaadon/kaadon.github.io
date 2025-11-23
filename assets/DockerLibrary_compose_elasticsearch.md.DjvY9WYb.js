import{_ as p,C as l,c,o as t,j as a,ae as i,G as r,a as n,w as o}from"./chunks/framework.BR0IJ75L.js";const x=JSON.parse('{"title":"elasticsearch 部署","description":"","frontmatter":{},"headers":[],"relativePath":"DockerLibrary/compose/elasticsearch.md","filePath":"DockerLibrary/compose/elasticsearch.md","lastUpdated":1763875544000}'),d={name:"DockerLibrary/compose/elasticsearch.md"},m={id:"elasticsearch-部署",tabindex:"-1"};function h(u,s,_,k,b,f){const e=l("center");return t(),c("div",null,[a("h1",m,[r(e,null,{default:o(()=>[...s[0]||(s[0]=[n(" elasticsearch 部署 ",-1)])]),_:1}),s[1]||(s[1]=n()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#elasticsearch-部署","aria-label":'Permalink to "<center> elasticsearch 部署 </center>"'},"​",-1))]),s[3]||(s[3]=i(`<h2 id="_1-compose-安装-elasticsearch-7-17-28" tabindex="-1">1 . Compose 安装 elasticsearch:7.17.28 <a class="header-anchor" href="#_1-compose-安装-elasticsearch-7-17-28" aria-label="Permalink to &quot;1 . Compose 安装 elasticsearch:7.17.28&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  elasticsearch:</span></span>
<span class="line"><span>    image: elasticsearch:7.17.28</span></span>
<span class="line"><span>    container_name: elasticsearch</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - cluster.name=es-single</span></span>
<span class="line"><span>      - node.name=es-node-1</span></span>
<span class="line"><span>      - discovery.type=single-node</span></span>
<span class="line"><span>      - network.host=0.0.0.0</span></span>
<span class="line"><span>      - http.port=9200</span></span>
<span class="line"><span>      - bootstrap.memory_lock=true</span></span>
<span class="line"><span>      - ES_JAVA_OPTS=-Xms8g -Xmx8g</span></span>
<span class="line"><span>      - xpack.security.enabled=false</span></span>
<span class="line"><span>      - xpack.security.http.ssl.enabled=false</span></span>
<span class="line"><span>      - xpack.security.transport.ssl.enabled=false</span></span>
<span class="line"><span>      - xpack.ml.enabled=false               # 🚨 关键参数，必须加</span></span>
<span class="line"><span>      - xpack.monitoring.collection.enabled=false # 建议附带关闭监控模块</span></span>
<span class="line"><span>    ulimits:</span></span>
<span class="line"><span>      memlock:</span></span>
<span class="line"><span>        soft: -1</span></span>
<span class="line"><span>        hard: -1</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /www/docker/easysearchData/_data:/usr/share/elasticsearch/data</span></span>
<span class="line"><span>      - /www/docker/easysearchData/_logs:/usr/share/elasticsearch/logs</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;9200:9200&quot;</span></span>
<span class="line"><span>      - &quot;9300:9300&quot;</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - docker</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    deploy:</span></span>
<span class="line"><span>      resources:</span></span>
<span class="line"><span>        limits:</span></span>
<span class="line"><span>          cpus: &quot;4.0&quot;</span></span>
<span class="line"><span>          memory: 8gb</span></span>
<span class="line"><span>    cpus: &quot;4.0&quot;</span></span>
<span class="line"><span>    mem_limit: 8gb</span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  docker:</span></span>
<span class="line"><span>    external: true</span></span></code></pre></div>`,2))])}const y=p(d,[["render",h]]);export{x as __pageData,y as default};
