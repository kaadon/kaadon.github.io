import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Kaadon's Notes",
    description: "Common tools and techniques, code snippets, skill summaries | The palest ink is better than the best memory|常用工具技巧, 代码片段, 技巧总结|好记信不如烂笔头",
    themeConfig: {
        logo: '/logo.png',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            // {text: 'markdown-examples', link: '/markdown-examples.md'},
            {
                text: '常用工具配置',
                items: [
                    {
                        text: 'NGINX 配置',
                        link: '/docs/CommonToolConfiguration/nginx.md'
                    },
                ]
            },
            {
                text: 'composer库',
                items: [
                ]
            },
            {
                text: 'npmJs库',
                items: [
                ]
            },
        ],
        sidebar: {
            "/docs/CommonToolConfiguration/": [
                {
                    text: 'NGINX 配置',
                    link: '/docs/CommonToolConfiguration/nginx.md'
                }
            ],
            "/docs/ComposerLibrary/": [
            ],
            "/docs/NpmLibrary/": [
            ]
        },
        socialLinks: [
            {icon: 'github', link: ' https://github.com/kaadon'},
        ],
        footer: {
            message: 'Telegram: <a href="https://t.me/kaadon"> @Kaadon </a> Web: <a href="https://kaadon.com"> kaadon.com </a>',
            copyright: 'Copyright © 2018-2024 <a href="https://github.com/kaadon"> Kaadon.github.io </a>'
        },
    },
    lastUpdated: true
})
