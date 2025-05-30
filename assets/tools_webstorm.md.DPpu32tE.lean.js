import{_ as t,C as o,c as p,o as l,j as s,$ as r,G as i,a as e,w as c}from"./chunks/framework.Dx8phnbP.js";const _=JSON.parse('{"title":"webstorm 配置","description":"","frontmatter":{},"headers":[],"relativePath":"tools/webstorm.md","filePath":"tools/webstorm.md","lastUpdated":1748597034000}'),d={name:"tools/webstorm.md"},b={id:"webstorm-配置",tabindex:"-1"};function m(h,a,u,w,f,k){const n=o("center");return l(),p("div",null,[s("h1",b,[i(n,null,{default:c(()=>a[0]||(a[0]=[e(" webstorm 配置")])),_:1,__:[0]}),a[1]||(a[1]=e()),a[2]||(a[2]=s("a",{class:"header-anchor",href:"#webstorm-配置","aria-label":'Permalink to "<center> webstorm 配置</center>"'},"​",-1))]),a[3]||(a[3]=r(`<h2 id="_1-无法识别名-alias" tabindex="-1">1. 无法识别名 @ &#39;alias&#39; <a class="header-anchor" href="#_1-无法识别名-alias" aria-label="Permalink to &quot;1. 无法识别名 @ &#39;alias&#39;&quot;">​</a></h2><h3 id="方式一" tabindex="-1">方式一 <a class="header-anchor" href="#方式一" aria-label="Permalink to &quot;方式一&quot;">​</a></h3><h4 id="新建-webstorm-webpack-config-js" tabindex="-1">新建 webstorm.webpack.config.js <a class="header-anchor" href="#新建-webstorm-webpack-config-js" aria-label="Permalink to &quot;新建 webstorm.webpack.config.js&quot;">​</a></h4><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&#39;use strict&#39;</span></span>
<span class="line"><span>const resolve = (dir) =&gt; {</span></span>
<span class="line"><span>    return path.join(__dirname, &#39;.&#39;, dir)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>    context: path.resolve(__dirname, &#39;./&#39;),</span></span>
<span class="line"><span>    resolve: {</span></span>
<span class="line"><span>        extensions: [&#39;.js&#39;, &#39;.vue&#39;, &#39;.json&#39;],</span></span>
<span class="line"><span>        alias: {</span></span>
<span class="line"><span>            &quot;@&quot;: resolve(&#39;src&#39;)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="配置中-webpack-配置为手动" tabindex="-1">配置中 webpack 配置为手动 <a class="header-anchor" href="#配置中-webpack-配置为手动" aria-label="Permalink to &quot;配置中 webpack 配置为手动&quot;">​</a></h4>`,5))])}const v=t(d,[["render",m]]);export{_ as __pageData,v as default};
