import{_ as t,c as l,j as a,G as p,w as e,a as i,$ as h,B as k,o as r}from"./chunks/framework.BXPBVUCY.js";const B=JSON.parse('{"title":"Mac常用系统配置","description":"","frontmatter":{},"headers":[],"relativePath":"other/mac/mac_system.md","filePath":"other/mac/mac_system.md","lastUpdated":1732277886000}'),d={name:"other/mac/mac_system.md"},c={id:"mac常用系统配置",tabindex:"-1"};function g(F,s,o,y,C,m){const n=k("center");return r(),l("div",null,[a("h1",c,[p(n,null,{default:e(()=>s[0]||(s[0]=[i("Mac常用系统配置")])),_:1}),s[1]||(s[1]=i()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#mac常用系统配置","aria-label":'Permalink to "<center>Mac常用系统配置</center>"'},"​",-1))]),s[3]||(s[3]=h(`<h2 id="_1-mac系统任务" tabindex="-1">1. mac系统任务 <a class="header-anchor" href="#_1-mac系统任务" aria-label="Permalink to &quot;1. mac系统任务&quot;">​</a></h2><h3 id="_1-1-创建任务配置" tabindex="-1">1.1 创建任务配置 <a class="header-anchor" href="#_1-1-创建任务配置" aria-label="Permalink to &quot;1.1 创建任务配置&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE plist PUBLIC &quot;-//Apple//DTD PLIST 1.0//EN&quot; &quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;&gt;</span></span>
<span class="line"><span>&lt;plist version=&quot;1.0&quot;&gt;</span></span>
<span class="line"><span>    &lt;dict&gt;</span></span>
<span class="line"><span>        &lt;key&gt;KeepAlive&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;true/&gt;</span></span>
<span class="line"><span>        &lt;key&gt;Label&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;string&gt;ramdisk.intramdisk.startup&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;key&gt;ProgramArguments&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>            &lt;string&gt;bash&lt;/string&gt;</span></span>
<span class="line"><span>            &lt;string&gt;/Users/codemiracle/.RamDisk/initramdisk.sh&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>        &lt;key&gt;RunAtLoad&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;true/&gt;</span></span>
<span class="line"><span>        &lt;key&gt;StandardErrorPath&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;string&gt;/usr/local/var/log/initramdisk_error.log&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;key&gt;StandardOutPath&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;string&gt;/usr/local/var/log/initramdisk.log&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;key&gt;WorkingDirectory&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;string&gt;/Users/codemiracle/.RamDisk&lt;/string&gt;</span></span>
<span class="line"><span>    &lt;/dict&gt;</span></span>
<span class="line"><span>&lt;/plist&gt;</span></span></code></pre></div><h3 id="_1-2-任务执行" tabindex="-1">1.2 任务执行 <a class="header-anchor" href="#_1-2-任务执行" aria-label="Permalink to &quot;1.2 任务执行&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 具体命令根据实际情况修改</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#先设置权限</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chown</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> root:wheel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /Library/LaunchDaemons/ae_scan_mac.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a+x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /Library/LaunchDaemons/ae_scan_mac.sh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chmod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 644</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /Library/LaunchDaemons/ae_scan_mac.plist</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#加载文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> launchctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> load</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /Library/LaunchDaemons/ae_scan_mac.plist</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#强制运行测试</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    launchctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /Library/LaunchDaemons/ae_scan_mac.plist</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#检查任务是否执行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> launchctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ramdisk.intramdisk.startup</span></span></code></pre></div><h2 id="_2-brew常用命令" tabindex="-1">2. brew常用命令 <a class="header-anchor" href="#_2-brew常用命令" aria-label="Permalink to &quot;2. brew常用命令&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看brew版本：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更新brew版本：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 本地软件库列表：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看软件库版本：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --versions</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查找软件包：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> search</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #（xxx为要查找软件的关键词）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装软件包：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #（xxx为软件包名称）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 卸载软件包：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uninstall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装软件：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cask</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx#（xxx为软件名称）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 卸载软件：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cask</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uninstall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查找软件安装位置：</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">which</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #（xxx为软件名称）</span></span></code></pre></div>`,7))])}const D=t(d,[["render",g]]);export{B as __pageData,D as default};
