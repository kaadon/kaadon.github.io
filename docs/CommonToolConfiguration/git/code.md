## <center> Git 代码部署</center>

### 1. 部署秘钥

- 服务器生成秘钥
```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
- 添加秘钥: 将一下代码添加到 `~/.bashrc` 文件中
```text
# 启动 ssh-agent 并设置环境变量
if [ -z "$SSH_AUTH_SOCK" ] || ! ps -p "$SSH_AGENT_PID" > /dev/null 2>&1; then
    eval "$(ssh-agent -s)"
fi

SSH_KEY="$HOME/.ssh/id_rsa"
if [ -f "$SSH_KEY" ]; then
    ssh-add -l 2>/dev/null | grep "$(ssh-keygen -lf $SSH_KEY | awk '{print $2}')" > /dev/null || ssh-add "$SSH_KEY"
fi

```

- 添加秘钥到 GitHub/GitLab/Gitee/Gitea
```shell
# 查看公钥
cat ~/.ssh/id_rsa.pub
```
> 将公钥添加到仓库配置中的(部署秘钥/Deploy keys),一般如果是公共服务器不要给与写权限,只读即可


- git 远程必须使用 ssh 的形式
```text
# 以gitea 为例
git@git.boolcdn.net:8022/[组织/用户]/[仓库名].git
# 以github 为例
git@github.com/[组织/用户]/[仓库名].git
```




