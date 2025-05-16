# <center>常用shell代码段</center>

## 1. 任务执行格式化输出
```shell
    #!/bin/env bash
    current_time=$(date +"%Y-%m-%d %H:%M:%S"); 
    echo "\n ------------------------------- \n 执行时间:$current_time \n"
```

## 2. RSYNC 后台上传
```shell
    #!/bin/env bash
    nohup sshpass -p "密码" rsync -avzP /www/backup/database/mysql/* [user]@[ip]:/www/backup/database/mysql > /www/rsync.log 2>&1 &
```

## 3. shell输出
```shell
# 输出当前目录下以及子目录中的所有php文件
find . -type f -name "*.php"
```

```shell
#输出当前目录下的文件夹 以 *|* 输出
printf "%s" "$(find . -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | paste -sd "|")"
```

```shell
#输出当前目录下的文件夹 以nginx禁止访问php
printf '\n#必须放在解析PHP之前\n#禁止目录执行php SATRT\nlocation ~* ^/(%s)/.*\\.(php|php5|php7|php8)$ {\n  default_type application/json;\n  return 200 '\''{"message":"You are definitely a particularly bad big fool."}'\'';\n}\n#禁止目录执行php END\n\n' "$(find . -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | paste -sd "|")"
```

