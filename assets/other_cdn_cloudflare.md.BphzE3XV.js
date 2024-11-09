import{_ as t,c as n,j as a,G as l,w as p,a as i,$ as h,B as o,o as d}from"./chunks/framework.C0DFtamT.js";const B=JSON.parse('{"title":"CDN:cloudflare","description":"","frontmatter":{},"headers":[],"relativePath":"other/cdn/cloudflare.md","filePath":"other/cdn/cloudflare.md","lastUpdated":1731161107000}'),r={name:"other/cdn/cloudflare.md"},k={id:"cdn-cloudflare",tabindex:"-1"};function c(u,s,F,C,g,y){const e=o("center");return d(),n("div",null,[a("h1",k,[l(e,null,{default:p(()=>s[0]||(s[0]=[i(" CDN:cloudflare ")])),_:1}),s[1]||(s[1]=i()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#cdn-cloudflare","aria-label":'Permalink to "<center> CDN:cloudflare  </center>"'},"​",-1))]),s[3]||(s[3]=h(`<h2 id="_1-缓存清除" tabindex="-1">1. 缓存清除 <a class="header-anchor" href="#_1-缓存清除" aria-label="Permalink to &quot;1. 缓存清除&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span></code></pre></div><h2 id="_2-禁止ipv6" tabindex="-1">2. 禁止IPV6 <a class="header-anchor" href="#_2-禁止ipv6" aria-label="Permalink to &quot;2. 禁止IPV6&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -X</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PATCH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://api.cloudflare.com/client/v4/zones/[域名id]/settings/ipv6&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -H</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;X-Auth-Email: [邮箱]&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -H</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;X-Auth-Key: [key]&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -H</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Content-Type: application/json&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;value&quot;: &quot;off&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     }&#39;</span></span></code></pre></div>`,4))])}const m=t(r,[["render",c]]);export{B as __pageData,m as default};