import{_ as t,c as n,j as a,G as l,w as o,a as e,$ as h,B as r,o as p}from"./chunks/framework.Dh36WAk7.js";const F=JSON.parse('{"title":"常用shell代码段","description":"","frontmatter":{},"headers":[],"relativePath":"CommonToolConfiguration/shell/common.md","filePath":"CommonToolConfiguration/shell/common.md","lastUpdated":1726148842000}'),d={name:"CommonToolConfiguration/shell/common.md"},k={id:"常用shell代码段",tabindex:"-1"};function c(m,s,u,g,E,C){const i=r("center");return p(),n("div",null,[a("h1",k,[l(i,null,{default:o(()=>s[0]||(s[0]=[e("常用shell代码段")])),_:1}),s[1]||(s[1]=e()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#常用shell代码段","aria-label":'Permalink to "<center>常用shell代码段</center>"'},"​",-1))]),s[3]||(s[3]=h(`<h2 id="_1-任务执行格式化输出" tabindex="-1">1. 任务执行格式化输出 <a class="header-anchor" href="#_1-任务执行格式化输出" aria-label="Permalink to &quot;1. 任务执行格式化输出&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #!/bin/env bash</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    current_time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">date</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +&quot;%Y-%m-%d %H:%M:%S&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;\\n ------------------------------- \\n 执行时间:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$current_time</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \\n&quot;</span></span></code></pre></div>`,2))])}const y=t(d,[["render",c]]);export{F as __pageData,y as default};
