import{_ as t,C as p,c as o,o as l,j as s,ae as r,G as c,a,w as i}from"./chunks/framework.CBTkueSR.js";const v=JSON.parse('{"title":"coturn 部署","description":"","frontmatter":{},"headers":[],"relativePath":"DockerLibrary/docker/coturn.md","filePath":"DockerLibrary/docker/coturn.md","lastUpdated":1762150931000}'),u={name:"DockerLibrary/docker/coturn.md"},d={id:"coturn-部署",tabindex:"-1"};function m(q,n,_,h,b,k){const e=p("center");return l(),o("div",null,[s("h1",d,[c(e,null,{default:i(()=>[...n[0]||(n[0]=[a(" coturn 部署 ",-1)])]),_:1}),n[1]||(n[1]=a()),n[2]||(n[2]=s("a",{class:"header-anchor",href:"#coturn-部署","aria-label":'Permalink to "<center> coturn 部署 </center>"'},"​",-1))]),n[3]||(n[3]=r(`<h2 id="_1-compose-安装-coturn-4-7-0" tabindex="-1">1 . Compose 安装 coturn:4.7.0 <a class="header-anchor" href="#_1-compose-安装-coturn-4-7-0" aria-label="Permalink to &quot;1 . Compose 安装 coturn:4.7.0&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
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
<span class="line"><span>      - /etc/localtime:/etc/localtime:ro</span></span></code></pre></div>`,2))])}const x=t(u,[["render",m]]);export{v as __pageData,x as default};
