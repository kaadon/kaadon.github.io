import { defineUserConfig,defaultTheme } from 'vuepress'


export default {
    locales: {
        '/en': {
            lang: 'en-US',
        },
        '/': {
            lang: 'zh-CN',
        },
    },
    defineUserConfig:defineUserConfig({
        lang: 'zh-CN',
        title: 'Book of Tomorrow',
        description: 'A rotten pen, the whole journey with me ...',
    }),
    theme: defaultTheme({
        locales: {
            '/': {
                selectLanguageName: '简体中文',
            },
            '/en/': {
                selectLanguageName: 'English',
            },
        },
        // 默认主题配置
        colorModeSwitch:true,
        navbar: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: 'php',
                link: '/pages/php/',
            },
            // NavbarGroup
            {
                text: 'Group',
                children: ['/group/foo.md', '/group/bar.md'],
            },
        ],
        sidebar: {
            '/': [
                {
                    text: 'VuePress Reference',
                    collapsible: true,
                    children: [
                        {
                            text: 'Foo',
                            link: '/foo/',
                        },
                        {
                            text: 'Foo',
                            link: '/foo/',
                        }
                    ],
                },
                {
                    text: 'Bundlers Reference',
                    collapsible: true,
                    children: ['/reference/bundler/vite.md', '/reference/bundler/webpack.md'],
                },
            ],
        },
    }),
}