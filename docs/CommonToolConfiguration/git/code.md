## <center> Git 代码部署</center>

### 1. 部署秘钥

- 服务器生成秘钥
> rsa
```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
> ed25519
```shell
ssh-keygen -t ed25519 -f my_ed25519_key -C "your_email@example.com"
```
- 添加秘钥: 将一下代码添加到 `~/.bashrc` 文件中
> 添加一个 ssh-agent 代理
```bash
# 设置 ssh-agent 代理
# 添加环境变量
if [ -z "$SSH_AUTH_SOCK" ] || ! ps -p "$SSH_AGENT_PID" > /dev/null 2>&1; then
    eval "$(ssh-agent -s)"
fi
# SSH_KEY="$HOME/.ssh/id_ed25519"
SSH_KEY="$HOME/.ssh/id_rsa" 
if [ -f "$SSH_KEY" ]; then
    ssh-add -l 2>/dev/null | grep "$(ssh-keygen -lf $SSH_KEY | awk '{print $2}')" > /dev/null || ssh-add "$SSH_KEY"
fi
# 设置 ssh-agent 代理完成
# 添加环境变量完成

```
> 添加多个 秘钥
```shell
# 自动启动 ssh-agent 并加载多个私钥
if [ -z "$SSH_AUTH_SOCK" ] || ! ps -p "$SSH_AGENT_PID" > /dev/null 2>&1; then
    eval "$(ssh-agent -s)"
fi

# 定义要加载的密钥列表（按需添加）
SSH_KEYS=(
    "$HOME/.ssh/id_ed25519"
    "$HOME/.ssh/id_rsa"
    "$HOME/.ssh/github_ed25519"
    "$HOME/.ssh/gitlab_ed25519"
)

# 遍历加载每个 key
for key in "${SSH_KEYS[@]}"; do
    if [ -f "$key" ]; then
        # 检查该 key 是否已加载
        fingerprint=$(ssh-keygen -lf "$key" | awk '{print $2}')
        if ! ssh-add -l 2>/dev/null | grep -q "$fingerprint"; then
            ssh-add "$key"
        fi
    fi
done
# 自动加载多个私钥完成
```
- 使配置生效
```shell
source ~/.bashrc
```

- 添加秘钥到 GitHub/GitLab/Gitee/Gitea
```shell
# 查看公钥
cat ~/.ssh/id_rsa.pub
```
> 将公钥添加到仓库配置中的(部署秘钥/Deploy keys),一般如果是公共服务器不要给与写权限,只读即可


- git 远程必须使用 ssh 的形式
- 以gitee 为例
```shell
# 克隆
git clone ssh://git@git.boolcdn.net:8022/[组织/用户]/[仓库名].git
# 添加远程
git remote add origin  
```
- 以github 为例
```shell
# 克隆
git clone git@github.com/[组织/用户]/[仓库名].git
# 添加远程
git remote add origin  git@github.com/[组织/用户]/[仓库名].git
```




