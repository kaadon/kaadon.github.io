import{_ as p,C as t,c as r,o as i,j as a,ae as l,G as o,a as n,w as c}from"./chunks/framework.CBTkueSR.js";const k=JSON.parse('{"title":"registry部署","description":"","frontmatter":{},"headers":[],"relativePath":"DockerLibrary/docker/registry.md","filePath":"DockerLibrary/docker/registry.md","lastUpdated":1762163812000}'),d={name:"DockerLibrary/docker/registry.md"},_={id:"registry部署",tabindex:"-1"};function g(m,s,y,u,T,h){const e=t("center");return i(),r("div",null,[a("h1",_,[o(e,null,{default:c(()=>[...s[0]||(s[0]=[n(" registry部署 ",-1)])]),_:1}),s[1]||(s[1]=n()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#registry部署","aria-label":'Permalink to "<center> registry部署 </center>"'},"​",-1))]),s[3]||(s[3]=l(`<h2 id="_1-compose-安装-registry" tabindex="-1">1 . Compose 安装 registry <a class="header-anchor" href="#_1-compose-安装-registry" aria-label="Permalink to &quot;1 . Compose 安装 registry&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span>
<span class="line"><span>  gitea:</span></span>
<span class="line"><span>    image: registry:latest</span></span>
<span class="line"><span>    container_name: registry</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;5000:5000&quot;</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      REGISTRY_HTTP_ADDR: 0.0.0.0:5000</span></span>
<span class="line"><span>      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /var/lib/registry</span></span>
<span class="line"><span>      REGISTRY_AUTH: htpasswd</span></span>
<span class="line"><span>      REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd</span></span>
<span class="line"><span>      REGISTRY_AUTH_HTPASSWD_REALM: &quot;Kaadon Registry&quot;</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /www/docker/volumes/registryData/_data:/var/lib/registry</span></span>
<span class="line"><span>      - /www/docker/volumes/registryData/_auth:/auth</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - gitea-net</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  gitea-net:</span></span>
<span class="line"><span>    driver: bridge</span></span>
<span class="line"><span>    name: gitea-net</span></span></code></pre></div>`,2))])}const S=p(d,[["render",g]]);export{k as __pageData,S as default};
