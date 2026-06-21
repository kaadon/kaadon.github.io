## <center> Git 常用</center>

### 1. 修改历史提交信息
```shell
# 修改最近一次提交信息
git commit --amend -m "新的提交信息"
```

### 2. 修改最近一次提交的内容（不修改提交信息） 
```shell
 git add . &&  git commit --amend  --no-edit
```
