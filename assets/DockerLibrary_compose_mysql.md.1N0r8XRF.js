import{_ as e,C as l,c as t,o,j as a,ae as i,G as r,a as n,w as c}from"./chunks/framework.CBTkueSR.js";const h=JSON.parse('{"title":"mysql 部署","description":"","frontmatter":{},"headers":[],"relativePath":"DockerLibrary/compose/mysql.md","filePath":"DockerLibrary/compose/mysql.md","lastUpdated":1762241207000}'),m={name:"DockerLibrary/compose/mysql.md"},d={id:"mysql-部署",tabindex:"-1"};function _(y,s,q,u,k,b){const p=l("center");return o(),t("div",null,[a("h1",d,[r(p,null,{default:c(()=>[...s[0]||(s[0]=[n(" mysql 部署 ",-1)])]),_:1}),s[1]||(s[1]=n()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#mysql-部署","aria-label":'Permalink to "<center> mysql 部署 </center>"'},"​",-1))]),s[3]||(s[3]=i(`<h2 id="_1-compose-安装-mysql-5-6" tabindex="-1">1 . Compose 安装 mysql:5.6 <a class="header-anchor" href="#_1-compose-安装-mysql-5-6" aria-label="Permalink to &quot;1 . Compose 安装 mysql:5.6&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span>
<span class="line"><span>  mysql:</span></span>
<span class="line"><span>    image: mysql:5.6</span></span>
<span class="line"><span>    container_name: mysql56</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;65306:3306&quot;</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      MYSQL_ROOT_PASSWORD: 123456</span></span>
<span class="line"><span>      MYSQL_DATABASE: mydatabase</span></span>
<span class="line"><span>      MYSQL_USER: docker</span></span>
<span class="line"><span>      MYSQL_PASSWORD: docker</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /www/docker/mysql56Data:/var/lib/mysql</span></span>
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
<span class="line"><span>    external: true</span></span></code></pre></div>`,2))])}const v=e(m,[["render",_]]);export{h as __pageData,v as default};
