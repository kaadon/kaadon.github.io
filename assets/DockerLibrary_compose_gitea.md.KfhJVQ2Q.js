import{_ as p,C as e,o as t,c as l,j as a,E as h,w as r,a as n,ae as k}from"./chunks/framework.BD9pLfSD.js";const A=JSON.parse('{"title":"Gitea部署","description":"","frontmatter":{},"headers":[],"relativePath":"DockerLibrary/compose/gitea.md","filePath":"DockerLibrary/compose/gitea.md","lastUpdated":1770091139000}'),o={name:"DockerLibrary/compose/gitea.md"},d={id:"gitea部署",tabindex:"-1"};function c(_,s,g,E,y,u){const i=e("center");return t(),l("div",null,[a("h1",d,[h(i,null,{default:r(()=>[...s[0]||(s[0]=[n(" Gitea部署 ",-1)])]),_:1}),s[1]||(s[1]=n()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#gitea部署","aria-label":'Permalink to "<center> Gitea部署 </center>"'},"​",-1))]),s[3]||(s[3]=k(`<h2 id="_1-compose-安装gitea" tabindex="-1">1 . Compose 安装Gitea <a class="header-anchor" href="#_1-compose-安装gitea" aria-label="Permalink to &quot;1 . Compose 安装Gitea&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span>
<span class="line"><span>  gitea:</span></span>
<span class="line"><span>    image: gitea/gitea:latest</span></span>
<span class="line"><span>    container_name: gitea</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - USER_UID=1000</span></span>
<span class="line"><span>      - USER_GID=1000</span></span>
<span class="line"><span>      - GITEA__database__DB_TYPE=mysql</span></span>
<span class="line"><span>      - GITEA__database__HOST=10.0.0.1:3306</span></span>
<span class="line"><span>      - GITEA__database__NAME=gitea</span></span>
<span class="line"><span>      - GITEA__database__USER=gitea</span></span>
<span class="line"><span>      - GITEA__database__PASSWD=gitea</span></span>
<span class="line"><span>      - GITEA_CUSTOM=/data/gitea</span></span>
<span class="line"><span>      - USER=git</span></span>
<span class="line"><span>      - DISABLE_REGISTRATION=true</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;3000:3000&quot;</span></span>
<span class="line"><span>      - &quot;22:22&quot;</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /www/docker/volumes/gitea/_data:/data</span></span>
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
<span class="line"><span>    external: true</span></span></code></pre></div><h2 id="_2-反向代理配置" tabindex="-1">2 . 反向代理配置 <a class="header-anchor" href="#_2-反向代理配置" aria-label="Permalink to &quot;2 . 反向代理配置&quot;">​</a></h2><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #PROXY-CONF-START</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ^~</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                         http://127.0.0.1:5000;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host               $http_host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Real-IP          $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Forwarded-For    $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Forwarded-Proto  $scheme;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # ✅ 必须添加：透传 Docker 的 Authorization 头</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Authorization      $http_authorization;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # ✅ 防止上传中断（尤其是大镜像）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        client_max_body_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_request_buffering </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">off</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        chunked_transfer_encoding </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 可选：长连接优化</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_http_version </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">900</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #PROXY-CONF-END</span></span></code></pre></div>`,4))])}const D=p(o,[["render",c]]);export{A as __pageData,D as default};
