import{_ as p,c as t,j as a,G as n,w as h,a as i,$ as l,B as o,o as r}from"./chunks/framework.Blft4D9Z.js";const y=JSON.parse('{"title":"常用PHP配置","description":"","frontmatter":{},"headers":[],"relativePath":"CommonToolConfiguration/php/php.md","filePath":"CommonToolConfiguration/php/php.md","lastUpdated":1735098291000}'),d={name:"CommonToolConfiguration/php/php.md"},k={id:"常用php配置",tabindex:"-1"};function c(m,s,g,F,u,C){const e=o("center");return r(),t("div",null,[a("h1",k,[n(e,null,{default:h(()=>s[0]||(s[0]=[i("常用PHP配置")])),_:1}),s[1]||(s[1]=i()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#常用php配置","aria-label":'Permalink to "<center>常用PHP配置</center>"'},"​",-1))]),s[3]||(s[3]=l(`<h2 id="安装第三方的php版本" tabindex="-1">安装第三方的php版本 <a class="header-anchor" href="#安装第三方的php版本" aria-label="Permalink to &quot;安装第三方的php版本&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #mac</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shivammathur/php</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shivammathur/php/php@7.4</span></span></code></pre></div><h2 id="大部分扩展安装" tabindex="-1">大部分扩展安装 <a class="header-anchor" href="#大部分扩展安装" aria-label="Permalink to &quot;大部分扩展安装&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    /www/server/php/81/bin/phpize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --with-php-config=/www/server/php/81/bin/php-config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div>`,4))])}const f=p(d,[["render",c]]);export{y as __pageData,f as default};