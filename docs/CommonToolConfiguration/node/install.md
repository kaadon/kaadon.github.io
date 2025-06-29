# <center>node安装</center>

## 1. nvm安装

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 20

nvm install 16

nvm install 18

nvm alias default 20
# Verify the Node.js version:
node -v # Should print "v22.14.0".
```

## 2. 配置nvm环境变量

### 2.1 linux
> 在`~/.bashrc`或`~/.profile`中添加以下内容：
```text
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

```

