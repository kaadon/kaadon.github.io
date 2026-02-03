# <center> webstorm 配置</center>

## 1. 无法识别名 @ 'alias'
### 方式一
#### 新建 webstorm.webpack.config.js
```text
'use strict'
const resolve = (dir) => {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            "@": resolve('src')
        }
    }
}
```
#### 配置中 webpack 配置为手动