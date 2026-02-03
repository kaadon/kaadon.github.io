# <center>nvm 配置</center>

## 1. 自动加载配置
### 1.1 在项目根目录创建一个名为 `.nvmrc` 的文件，内容为所需的 Node.js 版本号。例如：
```text
    18
```

### 1.2 配置 shell 启动时自动加载 `.nvmrc` 文件中的 Node.js 版本。在 `~/.bashrc` 或 `~/.zshrc` 中添加以下内容：
```text
    if [ -f ".nvmrc" ]; then 
      nvm use --silent --use-on-cd 
    fi
```

## 2. 错误处理

### 2.1 出现 ERR_OSSL_EVP_UNSUPPORTED
在使用 Node.js 17 及以上版本时，可能会遇到 `ERR_OSSL_EVP_UNSUPPORTED` 错误。解决方法是在启动 Node.js 应用时添加环境变量 `NODE_OPTIONS=--openssl-legacy-provider`。

