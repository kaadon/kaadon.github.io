import{_ as e,C as t,o,c as l,j as n,E as c,w as r,a,ae as i}from"./chunks/framework.BD9pLfSD.js";const x=JSON.parse('{"title":"coturn 部署","description":"","frontmatter":{},"headers":[],"relativePath":"DockerLibrary/compose/coturn.md","filePath":"DockerLibrary/compose/coturn.md","lastUpdated":1770090982000}'),u={name:"DockerLibrary/compose/coturn.md"},d={id:"coturn-部署",tabindex:"-1"};function m(q,s,_,b,h,f){const p=t("center");return o(),l("div",null,[n("h1",d,[c(p,null,{default:r(()=>[...s[0]||(s[0]=[a(" coturn 部署 ",-1)])]),_:1}),s[1]||(s[1]=a()),s[2]||(s[2]=n("a",{class:"header-anchor",href:"#coturn-部署","aria-label":'Permalink to "<center> coturn 部署 </center>"'},"​",-1))]),s[3]||(s[3]=i(`<h2 id="_1-compose-安装-coturn-4-7-0" tabindex="-1">1 . Compose 安装 coturn:4.7.0 <a class="header-anchor" href="#_1-compose-安装-coturn-4-7-0" aria-label="Permalink to &quot;1 . Compose 安装 coturn:4.7.0&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  coturn4:</span></span>
<span class="line"><span>    image: coturn/coturn:4.7.0</span></span>
<span class="line"><span>    container_name: coturn4</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    network_mode: &quot;host&quot;  # ✅ 宿主机网络，性能最高</span></span>
<span class="line"><span>    command:</span></span>
<span class="line"><span>      - &quot;--no-cli&quot;</span></span>
<span class="line"><span>      - &quot;--log-file=stdout&quot;</span></span>
<span class="line"><span>      - &quot;--pidfile=/var/tmp/turnserver.pid&quot;</span></span>
<span class="line"><span>      - &quot;--realm=webrtc.local&quot;</span></span>
<span class="line"><span>      - &quot;--external-ip=103.86.47.17&quot;</span></span>
<span class="line"><span>      - &quot;--relay-ip=103.86.47.17&quot;</span></span>
<span class="line"><span>      - &quot;--min-port=49152&quot;</span></span>
<span class="line"><span>      - &quot;--max-port=65535&quot;</span></span>
<span class="line"><span>      - &quot;--lt-cred-mech&quot;</span></span>
<span class="line"><span>      - &quot;--user=webrtc:webrtc&quot;</span></span>
<span class="line"><span>      - &quot;--no-tls&quot;</span></span>
<span class="line"><span>      - &quot;--no-dtls&quot;</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /etc/localtime:/etc/localtime:ro</span></span>
<span class="line"><span>    deploy:</span></span>
<span class="line"><span>      resources:</span></span>
<span class="line"><span>        limits:</span></span>
<span class="line"><span>          cpus: &quot;4.0&quot;</span></span>
<span class="line"><span>          memory: 8gb</span></span>
<span class="line"><span>    cpus: &quot;4.0&quot;</span></span>
<span class="line"><span>    mem_limit: 8gb</span></span></code></pre></div>`,2))])}const g=e(u,[["render",m]]);export{x as __pageData,g as default};
