import{_ as i,c as t,j as s,I as l,w as n,a,a1 as o,D as h,o as r}from"./chunks/framework.m1W33ys8.js";const q=JSON.parse('{"title":"MySQL","description":"","frontmatter":{},"headers":[],"relativePath":"CommonToolConfiguration/mysql.md","filePath":"CommonToolConfiguration/mysql.md","lastUpdated":1716267631000}'),p={name:"CommonToolConfiguration/mysql.md"},d={id:"mysql",tabindex:"-1"},c=s("a",{class:"header-anchor",href:"#mysql","aria-label":'Permalink to "<center>MySQL</center>"'},"​",-1),k=o('<h2 id="_1-创建数据库" tabindex="-1">1. 创建数据库 <a class="header-anchor" href="#_1-创建数据库" aria-label="Permalink to &quot;1. 创建数据库&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -u</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [your_username] -p -e </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;CREATE DATABASE [your_database_name] CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;&quot;</span></span></code></pre></div><h2 id="_2-导入数据到数据库" tabindex="-1">2. 导入数据到数据库 <a class="header-anchor" href="#_2-导入数据到数据库" aria-label="Permalink to &quot;2. 导入数据到数据库&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -u</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [your_username] -p [your_database_name] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a.sql</span></span></code></pre></div><h2 id="_3-备份数据库" tabindex="-1">3.备份数据库 <a class="header-anchor" href="#_3-备份数据库" aria-label="Permalink to &quot;3.备份数据库&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysqldump</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -u</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [your_username] -p [your_database_name] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a.sql</span></span></code></pre></div>',6);function u(_,m,y,g,C,E){const e=h("center");return r(),t("div",null,[s("h1",d,[l(e,null,{default:n(()=>[a("MySQL")]),_:1}),a(),c]),k])}const f=i(p,[["render",u]]);export{q as __pageData,f as default};
