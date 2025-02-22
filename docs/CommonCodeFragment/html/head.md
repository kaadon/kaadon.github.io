# <center>HEAD:标签示例</center>

## 一.og标签的所有示例
```html
<head>
  <!-- Open Graph 协议 -->
  <meta property="og:title" content="网页标题">
  <meta property="og:type" content="website"> <!-- 内容类型 (article, website, video, music, etc.) -->
  <meta property="og:image" content="图片的URL">
  <meta property="og:image:secure_url" content="图片的安全URL（https）">
  <meta property="og:image:type" content="image/jpeg"> <!-- 图片的MIME类型 -->
  <meta property="og:image:width" content="1200"> <!-- 图片宽度 -->
  <meta property="og:image:height" content="630"> <!-- 图片高度 -->
  <meta property="og:description" content="网页描述">
  <meta property="og:url" content="网页链接">
  <meta property="og:site_name" content="网站名称">
  <meta property="og:locale" content="en_US"> <!-- 网站语言 -->
  <meta property="og:locale:alternate" content="zh_CN"> <!-- 可选的备用语言 -->
  
  <!-- 对于视频内容 -->
  <meta property="og:video" content="视频的URL">
  <meta property="og:video:secure_url" content="视频的安全URL（https）">
  <meta property="og:video:type" content="video/mp4"> <!-- 视频的MIME类型 -->
  <meta property="og:video:width" content="1280">
  <meta property="og:video:height" content="720">

  <!-- 音乐内容 -->
  <meta property="og:audio" content="音频文件的URL">
  <meta property="og:audio:secure_url" content="音频文件的安全URL">
  <meta property="og:audio:type" content="audio/mp3">

  <!-- 文章相关 -->
  <meta property="og:article:published_time" content="2023-10-01T08:00:00+00:00">
  <meta property="og:article:modified_time" content="2023-10-10T12:00:00+00:00">
  <meta property="og:article:author" content="作者的名称或URL">
  <meta property="og:article:section" content="文章所属的部分或栏目">
  <meta property="og:article:tag" content="标签1">
  <meta property="og:article:tag" content="标签2">
  
  <!-- 多个图片 (可选) -->
  <meta property="og:image" content="图片URL1">
  <meta property="og:image" content="图片URL2">
</head>
```
## 二. 社交媒体平台<head> 标签示例
### 1. QQ
```html
<!--支持OG标签-->
<!-- QQ自定义标签（可选）-->
<meta name="qq:card" content="summary_large_image"> <!-- QQ的卡片类型 -->
<meta name="qq:title" content="网页标题"> <!-- 标题 -->
<meta name="qq:description" content="网页描述"> <!-- 描述 -->
<meta name="qq:image" content="图片的URL"> <!-- 图片 -->
```
### 2. 微博
```html
<!--支持OG标签-->
<!-- 微博自定义的标签（可选）-->
<meta name="weibo:card" content="summary_large_image"> <!-- 微博的卡片类型 -->
<meta name="weibo:title" content="网页标题"> <!-- 标题 -->
<meta name="weibo:description" content="网页描述"> <!-- 描述 -->
<meta name="weibo:image" content="图片的URL"> <!-- 图片 -->
```
### 3. Twitter
```html
<!-- 基本的 Twitter Card -->
<meta name="twitter:card" content="summary"> <!-- 或 summary_large_image -->
<meta name="twitter:title" content="网页标题">
<meta name="twitter:description" content="网页描述">
<meta name="twitter:image" content="图片的URL">
<meta name="twitter:url" content="网页链接">

<!-- 带大图的 Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="网页标题">
<meta name="twitter:description" content="网页描述">
<meta name="twitter:image" content="大图片的URL">
<meta name="twitter:url" content="网页链接">

<!-- Twitter Video Card (Player Card) -->
<meta name="twitter:card" content="player">
<meta name="twitter:title" content="视频标题">
<meta name="twitter:description" content="视频描述">
<meta name="twitter:player" content="视频播放器的URL">
<meta name="twitter:player:width" content="640">
<meta name="twitter:player:height" content="360">
<meta name="twitter:image" content="缩略图的URL">
<meta name="twitter:url" content="网页链接">

<!-- Twitter App Card -->
<meta name="twitter:card" content="app">
<meta name="twitter:title" content="应用标题">
<meta name="twitter:description" content="应用描述">
<meta name="twitter:image" content="应用图标的URL">
<meta name="twitter:app:id:iphone" content="iOS应用的ID">
<meta name="twitter:app:id:ipad" content="iPad应用的ID">
<meta name="twitter:app:id:googleplay" content="Android应用的ID">
<meta name="twitter:app:name:iphone" content="iOS应用的名称">
<meta name="twitter:app:name:ipad" content="iPad应用的名称">
<meta name="twitter:app:name:googleplay" content="Android应用的名称">
<meta name="twitter:app:url:iphone" content="iOS应用的深度链接">
<meta name="twitter:app:url:ipad" content="iPad应用的深度链接">
<meta name="twitter:app:url:googleplay" content="Android应用的深度链接">

<!-- Creator 和 Site 用户名 -->
<meta name="twitter:creator" content="@TwitterUsername"> <!-- 内容创作者的 Twitter 用户名 -->
<meta name="twitter:site" content="@SiteUsername"> <!-- 网站的 Twitter 用户名 -->

<!-- 图片描述 -->
<meta name="twitter:image:alt" content="图片的描述文本">

<!-- 综合卡片示例 -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="网页标题">
<meta name="twitter:description" content="网页描述">
<meta name="twitter:image" content="图片的URL">
<meta name="twitter:image:alt" content="图片的描述">
<meta name="twitter:player" content="视频播放器的URL">
<meta name="twitter:player:width" content="640">
<meta name="twitter:player:height" content="360">
<meta name="twitter:url" content="网页链接">
```
### 4. LinkedIn
```html
<meta property="og:title" content="网页标题">
<meta property="og:description" content="网页描述">
<meta property="og:image" content="图片的URL">
<meta property="og:url" content="网页链接">
<meta property="og:type" content="article">
<meta property="og:site_name" content="网站名称">
```
### 5. Pinterest
```html
<meta property="og:type" content="website">
<meta property="og:title" content="Pinterest分享标题">
<meta property="og:description" content="Pinterest分享描述">
<meta property="og:image" content="Pinterest分享图片">
<meta property="og:url" content="Pinterest分享链接">
<meta name="pinterest" content="nopin" /> <!-- 防止内容被Pin -->
```
### 6. Google 搜索 (Structured Data)
```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "网页标题",
    "description": "网页描述",
    "image": "图片的URL",
    "url": "网页链接",
    "author": {
      "@type": "Person",
      "name": "作者姓名"
    },
    "publisher": {
      "@type": "Organization",
      "name": "出版公司名称",
      "logo": {
        "@type": "ImageObject",
        "url": "出版社Logo的URL"
      }
    }
  }
  </script>
```
### 7. 微信
```html
<head>
<!--支持OG标签-->
<!-- 微信分享的自定义标签 -->
<!-- 分享标题 -->
<meta name="wechat:title" content="网页标题">

<!-- 分享描述 -->
<meta name="wechat:description" content="网页描述">

<!-- 分享图片 -->
<meta name="wechat:image" content="图片的URL">

<!-- 分享卡片类型 -->
<meta name="wechat:card" content="summary_large_image"> <!-- 可选值：summary_large_image 或 summary -->

<!-- 公众号文章的原文链接 -->
<meta name="wechat:source" content="原文链接">

<!-- 公众号的名称 -->
<meta name="wechat:app_name" content="公众号名称">

<!-- 分享内容的类型（例如文章、图片等） -->
<meta name="wechat:type" content="article"> <!-- 可选值：article、image、video 等 -->

<!-- 如果分享的是视频内容，可以指定视频的封面 -->
<meta name="wechat:video:cover" content="视频封面的URL">

<!-- 如果是视频卡片，指定视频的播放链接 -->
<meta name="wechat:video:play" content="视频播放链接">

<!-- 如果有文章的原文内容链接 -->
<meta name="wechat:content" content="原文内容的URL">

<!-- 微信支持的自定义参数 -->
<meta name="wechat:open_type" content="view"> <!-- 可选值：view、miniProgram -->
<meta name="wechat:mini_program" content="miniProgramID"> <!-- 微信小程序的ID -->
<meta name="wechat:mini_program:page" content="小程序页面路径"> <!-- 小程序页面路径 -->
</head>

```


