import{_ as i,C as p,o as l,c as t,j as a,E as c,w as r,a as n,ae as h}from"./chunks/framework.BD9pLfSD.js";const b=JSON.parse('{"title":"elasticsearch 部署","description":"","frontmatter":{},"headers":[],"relativePath":"DockerLibrary/compose/elasticsearch.md","filePath":"DockerLibrary/compose/elasticsearch.md","lastUpdated":1769931847000}'),k={name:"DockerLibrary/compose/elasticsearch.md"},o={id:"elasticsearch-部署",tabindex:"-1"};function d(g,s,E,y,m,u){const e=p("center");return l(),t("div",null,[a("h1",o,[c(e,null,{default:r(()=>[...s[0]||(s[0]=[n(" elasticsearch 部署 ",-1)])]),_:1}),s[1]||(s[1]=n()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#elasticsearch-部署","aria-label":'Permalink to "<center> elasticsearch 部署 </center>"'},"​",-1))]),s[3]||(s[3]=h(`<h2 id="_1-compose-安装-elasticsearch-7-17-28" tabindex="-1">1 . Compose 安装 elasticsearch:7.17.28 <a class="header-anchor" href="#_1-compose-安装-elasticsearch-7-17-28" aria-label="Permalink to &quot;1 . Compose 安装 elasticsearch:7.17.28&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span>
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
<span class="line"><span>      - ES_JAVA_OPTS=-Xms4g -Xmx4g</span></span>
<span class="line"><span>      - xpack.security.enabled=false</span></span>
<span class="line"><span>      - xpack.security.http.ssl.enabled=false</span></span>
<span class="line"><span>      - xpack.security.transport.ssl.enabled=false</span></span>
<span class="line"><span>      - ingest.geoip.downloader.enabled=false</span></span>
<span class="line"><span>      - logger.level=WARN</span></span>
<span class="line"><span>      - xpack.ml.enabled=false</span></span>
<span class="line"><span>      - xpack.monitoring.collection.enabled=false</span></span>
<span class="line"><span>    ulimits:</span></span>
<span class="line"><span>      memlock:</span></span>
<span class="line"><span>        soft: -1</span></span>
<span class="line"><span>        hard: -1</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /www/docker/easysearchData/_data:/usr/share/elasticsearch/data</span></span>
<span class="line"><span>      - /www/docker/easysearchData/_log:/usr/share/elasticsearch/logs</span></span>
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
<span class="line"><span>    logging:</span></span>
<span class="line"><span>      driver: json-file</span></span>
<span class="line"><span>      options:</span></span>
<span class="line"><span>        max-size: &quot;2m&quot;</span></span>
<span class="line"><span>        max-file: &quot;10&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  docker:</span></span>
<span class="line"><span>    external: true</span></span></code></pre></div><h2 id="_2-elasticsearch-配置文件env" tabindex="-1">2 . elasticsearch 配置文件env <a class="header-anchor" href="#_2-elasticsearch-配置文件env" aria-label="Permalink to &quot;2 . elasticsearch 配置文件env&quot;">​</a></h2><div class="language-dotenv vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dotenv</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">cluster.name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">es-single</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">node.name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">es-node-1</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">discovery.type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">single-node</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">network.host</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">http.port</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">9200</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">bootstrap.memory_lock</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">true</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ES_JAVA_OPTS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-Xms2g -Xmx7g</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">xpack.security.enabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">false</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">xpack.security.http.ssl.enabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">false</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">xpack.security.transport.ssl.enabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">false</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">xpack.ml.enabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">false</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">xpack.monitoring.collection.enabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">false</span></span></code></pre></div>`,4))])}const _=i(k,[["render",d]]);export{b as __pageData,_ as default};
