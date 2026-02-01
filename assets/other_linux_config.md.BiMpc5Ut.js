import{_ as e,C as l,o as t,c as p,j as n,E as h,w as r,a,ae as k}from"./chunks/framework.BD9pLfSD.js";const E=JSON.parse('{"title":"常用配置","description":"","frontmatter":{},"headers":[],"relativePath":"other/linux/config.md","filePath":"other/linux/config.md","lastUpdated":1769931847000}'),o={name:"other/linux/config.md"},d={id:"常用配置",tabindex:"-1"};function c(F,s,g,y,u,A){const i=l("center");return t(),p("div",null,[n("h1",d,[h(i,null,{default:r(()=>[...s[0]||(s[0]=[a(" 常用配置 ",-1)])]),_:1}),s[1]||(s[1]=a()),s[2]||(s[2]=n("a",{class:"header-anchor",href:"#常用配置","aria-label":'Permalink to "<center> 常用配置 </center>"'},"​",-1))]),s[3]||(s[3]=k(`<h2 id="_1-sshd-config配置" tabindex="-1">1. sshd_config配置 <a class="header-anchor" href="#_1-sshd-config配置" aria-label="Permalink to &quot;1. sshd_config配置&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Port 34002</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">AddressFamily any</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ListenAddress 0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ListenAddress :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 仅允许密钥登录</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">PasswordAuthentication no</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ChallengeResponseAuthentication no</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">PubkeyAuthentication yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">PermitEmptyPasswords no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># root 允许登录，但必须使用密钥（不会因密码错误被撞库）</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">PermitRootLogin without-password</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定公钥存放路径</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">AuthorizedKeysFile .ssh/authorized_keys</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 禁止一切转发通道</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">AllowTcpForwarding no</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">GatewayPorts no</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">PermitTunnel no</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">X11Forwarding no</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">AllowAgentForwarding no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 基本安全限制</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">StrictModes yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MaxAuthTries 3</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">LoginGraceTime 30</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 保留必要的 SFTP 子系统</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Subsystem sftp internal-sftp</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 防爆破参数（可选，但非常推荐）</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MaxStartups 3:30:60</span></span></code></pre></div>`,2))])}const _=e(o,[["render",c]]);export{E as __pageData,_ as default};
