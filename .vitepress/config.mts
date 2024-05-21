import {defineConfig} from 'vitepress'
import * as fs from "node:fs";
import * as path from "node:path";

function copyDirSync(source, target) {
    // Check if target directory exists, if not, create it
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    // Get the files in the source directory
    const files = fs.readdirSync(source);

    for (let i = 0; i < files.length; i++) {
        const current = fs.lstatSync(path.join(source, files[i]));
        if (current.isDirectory()) {
            // If directory, recursive call with new source and target
            copyDirSync(path.join(source, files[i]), path.join(target, files[i]));
        } else if (current.isSymbolicLink()) {
            // If symlink, create a new one in the target directory
            const symlink = fs.readlinkSync(path.join(source, files[i]));
            fs.symlinkSync(symlink, path.join(target, files[i]));
        } else {
            // If file, copy it into the target directory
            fs.copyFileSync(path.join(source, files[i]), path.join(target, files[i]));
        }
    }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    srcDir: './docs',
    head: [['link', {rel: 'icon', href: '/assets/images/logo.png'}]],
    title: "Kaadon's Notes",
    description: "Common tools and techniques, code snippets, skill summaries | The palest ink is better than the best memory|常用工具技巧, 代码片段, 技巧总结|好记信不如烂笔头",
    themeConfig: {
        logo: '/assets/images/logo.png',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            // {text: 'markdown-examples', link: '/markdown-examples.md'},
            {
                text: '常用工具配置',
                items: [
                    {
                        text: 'NGINX常用配置',
                        link: '/CommonToolConfiguration/nginx.md'
                    },
                    {
                        text: 'PHP常用配置',
                        link: '/CommonToolConfiguration/php.md'
                    },
                    {
                        text: 'MYSQL常用配置',
                        link: '/CommonToolConfiguration/mysql.md'
                    }
                ]
            },
            {
                text: 'composer库',
                items: []
            },
            {
                text: 'npmJs库',
                items: []
            },
            {
                text: '语言学习',
                items: [
                    {
                        text: 'PYTHON学习路线',
                        items: [
                            {
                                text: 'python学习总览',
                                link: '/LanguageLearning/python/index.md'
                            }
                        ]
                    }
                ]
            },
        ],
        sidebar: {
            "/CommonToolConfiguration/": [
                {
                    text: 'NGINX常用配置',
                    link: '/CommonToolConfiguration/nginx.md'
                },
                {
                    text: 'PHP常用配置',
                    link: '/CommonToolConfiguration/php.md'
                },
                {
                    text: 'MYSQL常用配置',
                    link: '/CommonToolConfiguration/mysql.md'
                }
            ],
            "/ComposerLibrary/": [],
            "/NpmLibrary/": [],
            "/LanguageLearning/python/": [
                {
                    text: 'PYTHON学习路线',
                    items: [
                        {
                            text: 'python学习总览',
                            link: '/LanguageLearning/python/index.md'
                        }
                    ]
                }
            ],

        },
        socialLinks: [
            {icon: 'github', link: ' https://github.com/kaadon'},
        ],
        footer: {
            message: 'Telegram: <a href="https://t.me/kaadon"> @Kaadon </a> Web: <a href="https://kaadon.com"> kaadon.com </a>',
            copyright: 'Copyright © 2018-2024 <a href="https://github.com/kaadon"> Kaadon.github.io </a>'
        },
    },
    lastUpdated: true,
    buildEnd: function (app) {
        copyDirSync(`./${app.assetsDir}`, `${app.outDir}/${app.assetsDir}`)
    }
})
