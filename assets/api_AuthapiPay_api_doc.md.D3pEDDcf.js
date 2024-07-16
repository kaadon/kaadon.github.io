import{_ as p,c as t,j as a,I as i,w as e,a as s,a1 as l,D as h,o}from"./chunks/framework.BMq8Ihuv.js";const m=JSON.parse('{"title":"Authapi Pay 文档","description":"","frontmatter":{},"headers":[],"relativePath":"api/AuthapiPay/api_doc.md","filePath":"api/AuthapiPay/api_doc.md","lastUpdated":1721110273000}'),u={name:"api/AuthapiPay/api_doc.md"},r={id:"authapi-pay-文档",tabindex:"-1"},d=a("a",{class:"header-anchor",href:"#authapi-pay-文档","aria-label":'Permalink to "<center> Authapi Pay 文档</center>"'},"​",-1),c=l(`<h2 id="_1-回调消息" tabindex="-1">1. 回调消息 <a class="header-anchor" href="#_1-回调消息" aria-label="Permalink to &quot;1. 回调消息&quot;">​</a></h2><h3 id="_1-1-充值" tabindex="-1">1.1 充值 <a class="header-anchor" href="#_1-1-充值" aria-label="Permalink to &quot;1.1 充值&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;type&quot;: &quot;recharge&quot;,</span></span>
<span class="line"><span>  &quot;data&quot;: {</span></span>
<span class="line"><span>       &quot;hash&quot;: &quot;eed615215b514d790d76c25853675a3b66e964f56fc7b6497240f3d157ac6222&quot;,</span></span>
<span class="line"><span>       &quot;mid&quot;: &quot;10&quot;,</span></span>
<span class="line"><span>       &quot;status&quot;: 1,//0:失败,1成功</span></span>
<span class="line"><span>       &quot;money&quot;: &quot;19.119458&quot;,//金额</span></span>
<span class="line"><span>       &quot;from_address&quot;: &quot;TYKbrW8LN3EqwzvWGScZ21D5jLH1Y4WcNN&quot;,</span></span>
<span class="line"><span>       &quot;address_id&quot;: 24,</span></span>
<span class="line"><span>       &quot;address&quot;: &quot;TPbVq59maB7aDzZGuQpB7nH68BEzpKSpKo&quot;,</span></span>
<span class="line"><span>       &quot;type&quot;: 1,//1:trx 2:usdt</span></span>
<span class="line"><span>       &quot;chain_time&quot;: 1676614041,</span></span>
<span class="line"><span>       &quot;create_time&quot;: 1676614055,</span></span>
<span class="line"><span>       &quot;update_time&quot;: 1676614055,</span></span>
<span class="line"><span>       &quot;block&quot;: 48668856,</span></span>
<span class="line"><span>       &quot;blockhash&quot;: &quot;0000000002e6a0b81fda35d609389b06c3568179aee24fd80dc854ddb47cde80&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_1-2-提现trx-usdt-以及提现状态withdraw-status" tabindex="-1">1.2 提现TRX,USDT 以及提现状态withdraw_status <a class="header-anchor" href="#_1-2-提现trx-usdt-以及提现状态withdraw-status" aria-label="Permalink to &quot;1.2 提现TRX,USDT   以及提现状态withdraw_status&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//withdraw_trx,withdraw_usdt : 提交成功推送</span></span>
<span class="line"><span>//withdraw_status : 转账验证成功推送</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;type&quot;: &quot;withdraw_trx&quot;,//withdraw_trx,withdraw_usdt,withdraw_status</span></span>
<span class="line"><span>  &quot;data&quot;: {</span></span>
<span class="line"><span>     &quot;id&quot;: 89,</span></span>
<span class="line"><span>     &quot;block&quot;: &quot;0&quot;,//withdraw_status会有值</span></span>
<span class="line"><span>     &quot;blockhash&quot;: &quot;&quot;,//withdraw_status会有值</span></span>
<span class="line"><span>     &quot;hash&quot;: &quot;c597df806e1fb6e3b09954dca56f43a6c356d0f2e001d4076546507b875af375&quot;,</span></span>
<span class="line"><span>     &quot;transefer_status&quot;: 2,//0:验证失败, 1验证成功</span></span>
<span class="line"><span>     &quot;status&quot;: 1,//提交成功1</span></span>
<span class="line"><span>     &quot;type&quot;: 1,//1:trx 2:usdt</span></span>
<span class="line"><span>     &quot;address&quot;: &quot;TTiZnK2bfLxYtcsRyPvPK9gH99TBV65MD4&quot;,</span></span>
<span class="line"><span>     &quot;from_address&quot;: &quot;&quot;,//转账成功会有显示</span></span>
<span class="line"><span>     &quot;money&quot;: 1.0,</span></span>
<span class="line"><span>     &quot;create_time&quot;: &quot;2023-02-16 16:29:11&quot;,</span></span>
<span class="line"><span>     &quot;update_time&quot;: &quot;2023-02-16 16:29:14&quot;,</span></span>
<span class="line"><span>     &quot;delete_time&quot;: &quot;&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_2-搭建步骤" tabindex="-1">2. 搭建步骤 <a class="header-anchor" href="#_2-搭建步骤" aria-label="Permalink to &quot;2. 搭建步骤&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1.扫描区块</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#[path] 系统目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#请使用进程守护执行 例如 supervisor </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [path]/think ScanBlock</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 余额归集</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#[path] 系统目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#请使用进程守护执行 例如 supervisor </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [path]/think queue:work --queue TronCapital_tronIntegrationFromUser</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 充值分发</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#[path] 系统目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#请使用进程守护执行 例如 supervisor </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [path]/think queue:work --queue SystemUpdate_ScanStore</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 地址余额</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#[path] 系统目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#请使用进程守护执行 例如 supervisor </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [path]/think queue:work --queue TronCapital_updateAddressMoney</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. 打款提现</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#[path] 系统目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#请使用进程守护执行 例如 supervisor </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [path]/think queue:work --queue TronCapital_sendTronCapital</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6. 消息推送</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#[path] 系统目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#请使用进程守护执行 例如 supervisor </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [path]/think queue:work --queue MessagePush_PushUrl</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 7. 打款状态查询</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#[path] 系统目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#请使用进程守护执行 例如 supervisor </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [path]/think queue:work --queue TronCapital_getTransactionStatus</span></span></code></pre></div><h2 id="_3-搭建环境" tabindex="-1">3.搭建环境 <a class="header-anchor" href="#_3-搭建环境" aria-label="Permalink to &quot;3.搭建环境&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># mysql5.6</span></span>
<span class="line"><span># php8.1   扩展必须:swoole,redis,gmp, 去除函数: putenv</span></span>
<span class="line"><span># redis 需设置密码</span></span>
<span class="line"><span># nginx</span></span></code></pre></div>`,9);function k(q,_,g,y,A,D){const n=h("center");return o(),t("div",null,[a("h1",r,[i(n,null,{default:e(()=>[s(" Authapi Pay 文档")]),_:1}),s(),d]),c])}const w=p(u,[["render",k]]);export{m as __pageData,w as default};
