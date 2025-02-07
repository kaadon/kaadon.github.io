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
