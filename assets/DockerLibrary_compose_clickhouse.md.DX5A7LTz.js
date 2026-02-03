import{_ as p,C as l,o as c,c as o,j as a,E as t,w as i,a as n,ae as r}from"./chunks/framework.BD9pLfSD.js";const x=JSON.parse('{"title":"clickhouse 部署","description":"","frontmatter":{},"headers":[],"relativePath":"DockerLibrary/compose/clickhouse.md","filePath":"DockerLibrary/compose/clickhouse.md","lastUpdated":1770091139000}'),u={name:"DockerLibrary/compose/clickhouse.md"},d={id:"clickhouse-部署",tabindex:"-1"};function h(k,s,m,_,b,f){const e=l("center");return c(),o("div",null,[a("h1",d,[t(e,null,{default:i(()=>[...s[0]||(s[0]=[n(" clickhouse 部署 ",-1)])]),_:1}),s[1]||(s[1]=n()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#clickhouse-部署","aria-label":'Permalink to "<center> clickhouse 部署 </center>"'},"​",-1))]),s[3]||(s[3]=r(`<h2 id="_1-compose-安装-clickhouse" tabindex="-1">1 . Compose 安装 clickhouse <a class="header-anchor" href="#_1-compose-安装-clickhouse" aria-label="Permalink to &quot;1 . Compose 安装 clickhouse&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span>
<span class="line"><span>  clickhouse:</span></span>
<span class="line"><span>    image: clickhouse/clickhouse-server:latest</span></span>
<span class="line"><span>    container_name: clickhouse</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;8123:8123&quot;</span></span>
<span class="line"><span>      - &quot;9000:9000&quot;</span></span>
<span class="line"><span>    ulimits:</span></span>
<span class="line"><span>      nofile:</span></span>
<span class="line"><span>        soft: 262144</span></span>
<span class="line"><span>        hard: 262144</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      docker:</span></span>
<span class="line"><span>        ipv4_address: 10.0.0.3</span></span>
<span class="line"><span>    deploy:</span></span>
<span class="line"><span>      resources:</span></span>
<span class="line"><span>        limits:</span></span>
<span class="line"><span>          cpus: &quot;4.0&quot;</span></span>
<span class="line"><span>          memory: 8gb</span></span>
<span class="line"><span>    cpus: &quot;4.0&quot;</span></span>
<span class="line"><span>    mem_limit: 8gb</span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  docker:</span></span>
<span class="line"><span>    external: true</span></span></code></pre></div>`,2))])}const g=p(u,[["render",h]]);export{x as __pageData,g as default};
