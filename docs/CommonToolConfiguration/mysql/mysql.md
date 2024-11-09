# <center>MySQL</center>

## 1. 创建数据库

```shell
mysql -u [your_username] -p -e "CREATE DATABASE [your_database_name] CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

## 2. 导入数据到数据库

```shell
mysql -u [your_username] -p [your_database_name] < a.sql
```

## 3.备份数据库

```shell
mysqldump -u [your_username] -p [your_database_name] > a.sql
```

