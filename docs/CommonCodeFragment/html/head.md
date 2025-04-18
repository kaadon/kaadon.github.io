# <center>HEAD:标签示例</center>

## 一.og标签的所有示例
```html
    <head>
  <!-- Open Graph Protocol -->
  <meta property="og:title" content="网页标题" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="图片的URL" />
  <meta property="og:description" content="网页描述" />
  <meta property="og:url" content="网页链接" />
  <meta property="og:site_name" content="网站名称" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="zh_CN" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="网页标题" />
  <meta name="twitter:description" content="网页描述" />
  <meta name="twitter:image" content="图片的URL" />
  <meta name="twitter:url" content="网页链接" />

  <!-- QQ -->
  <meta name="qq:card" content="summary_large_image" />
  <meta name="qq:title" content="网页标题" />
  <meta name="qq:description" content="网页描述" />
  <meta name="qq:image" content="图片的URL" />

  <!-- 微博 -->
  <meta name="weibo:card" content="summary_large_image" />
  <meta name="weibo:title" content="网页标题" />
  <meta name="weibo:description" content="网页描述" />
  <meta name="weibo:image" content="图片的URL" />

  <!-- LinkedIn -->
  <meta property="og:type" content="article" />

  <!-- Pinterest -->
  <meta name="pinterest" content="nopin" />

  <!-- 微信 -->
  <meta name="wechat:title" content="网页标题" />
  <meta name="wechat:description" content="网页描述" />
  <meta name="wechat:image" content="图片的URL" />
  <meta name="wechat:card" content="summary_large_image" />

  <!-- Structured Data -->
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
</head>
```


