import{_ as t,c as l,j as a,G as n,w as h,a as i,$ as p,B as r,o as k}from"./chunks/framework.DaRF1ErO.js";const C=JSON.parse('{"title":"Elasticsearch安装","description":"","frontmatter":{},"headers":[],"relativePath":"CommonToolConfiguration/elasticsearch.md","filePath":"CommonToolConfiguration/elasticsearch.md","lastUpdated":1725520992000}'),c={name:"CommonToolConfiguration/elasticsearch.md"},d={id:"elasticsearch安装",tabindex:"-1"};function o(g,s,F,E,y,u){const e=r("center");return k(),l("div",null,[a("h1",d,[n(e,null,{default:h(()=>s[0]||(s[0]=[i("Elasticsearch安装")])),_:1}),s[1]||(s[1]=i()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#elasticsearch安装","aria-label":'Permalink to "<center>Elasticsearch安装</center>"'},"​",-1))]),s[3]||(s[3]=p(`<h2 id="一、-elasticsearch-7-x-安装" tabindex="-1">一、 Elasticsearch 7.x 安装 <a class="header-anchor" href="#一、-elasticsearch-7-x-安装" aria-label="Permalink to &quot;一、 Elasticsearch 7.x 安装&quot;">​</a></h2><h3 id="_1-1安装es" tabindex="-1">1.1安装es <a class="header-anchor" href="#_1-1安装es" aria-label="Permalink to &quot;1.1安装es&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://artifacts.elastic.co/GPG-KEY-elasticsearch</span></span></code></pre></div><h3 id="_1-2配置yum源" tabindex="-1">1.2配置yum源 <a class="header-anchor" href="#_1-2配置yum源" aria-label="Permalink to &quot;1.2配置yum源&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/yum.repos.d/elasticsearch.repo</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#插入下面代码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [elasticsearch-7.x]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Elasticsearch</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> repository</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 7.x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> packages</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    baseurl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://artifacts.elastic.co/packages/7.x/yum</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    gpgcheck</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    gpgkey</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://artifacts.elastic.co/GPG-KEY-elasticsearch</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    enabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    autorefresh</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">rpm-md</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#shift+：  输入wq回车保存</span></span></code></pre></div><h3 id="_1-3-安装-elasticsearch-7-x" tabindex="-1">1.3 安装 Elasticsearch 7.x <a class="header-anchor" href="#_1-3-安装-elasticsearch-7-x" aria-label="Permalink to &quot;1.3 安装 Elasticsearch 7.x&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> elasticsearch</span></span></code></pre></div><h3 id="_1-4-启动-elasticsearch" tabindex="-1">1.4 启动 Elasticsearch <a class="header-anchor" href="#_1-4-启动-elasticsearch" aria-label="Permalink to &quot;1.4 启动 Elasticsearch&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> elasticsearch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span></code></pre></div>`,9))])}const b=t(c,[["render",o]]);export{C as __pageData,b as default};
