# <center>node安装</center>

## 1. nvm安装

```bash
# 下载并安装 nvm：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# 代替重启 shell
\. "$HOME/.nvm/nvm.sh"

# 下载并安装 Node 16：
nvm install 16

# 下载并安装 Yarn:
corepack enable yarn

# 验证 Yarn 版本：
yarn -v

# 下载并安装 pnpm:
corepack enable pnpm

# 验证 pnpm 版本：
pnpm -v

# 下载并安装 Node 18：
nvm install 18

# 下载并安装 Yarn:
corepack enable yarn

# 验证 Yarn 版本：
yarn -v

# 下载并安装 pnpm:
corepack enable pnpm

# 验证 pnpm 版本：
pnpm -v

# 下载并安装 Node 20：
nvm install 20

# 下载并安装 Yarn:
corepack enable yarn

# 验证 Yarn 版本：
yarn -v

# 下载并安装 pnpm:
corepack enable pnpm

# 验证 pnpm 版本：
pnpm -v

# 下载并安装 Node 22：
nvm install 22

# 下载并安装 Yarn:
corepack enable yarn

# 验证 Yarn 版本：
yarn -v

# 下载并安装 pnpm:
corepack enable pnpm

# 验证 pnpm 版本：
pnpm -v

# 下载并安装 Node 24：
nvm install 24

# 下载并安装 Yarn:
corepack enable yarn

# 验证 Yarn 版本：
yarn -v

# 下载并安装 pnpm:
corepack enable pnpm

# 验证 pnpm 版本：
pnpm -v

nvm alias default 18
```

## 2. 配置nvm环境变量

### 2.1 linux
> 在`~/.bashrc`或`~/.profile`中添加以下内容：
```text
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

```

