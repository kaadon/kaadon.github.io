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
