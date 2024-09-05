# <center> unbutu配置 </center>

## 1. 防火墙
```shell
# 查看防火墙状态
sudo ufw status
# 开启防火墙
sudo ufw enable
# 关闭防火墙
sudo ufw disable
# 开启端口
sudo ufw allow [port]
# 开启多个端口
sudo ufw allow [port],[port],[port]
# 开启指定协议
sudo ufw allow [port]/[tcp/udp]
# 开启指定ip
sudo ufw allow from [ip]
# 开启指定网段
sudo ufw allow from [ip]/[mask]
# 删除规则
sudo ufw delete allow [port]
# 删除指定ip规则
sudo ufw delete allow from [ip]
# 删除指定网段规则
sudo ufw delete allow from [ip]/[mask]
```

