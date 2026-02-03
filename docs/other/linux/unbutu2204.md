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

## 2. 安装gmp
```shell
sudo apt-get install libgmp-dev
```

## 3. ufw 一键 shell

### 3.1 宝塔版
```shell
#!/bin/bash
# 说明: 自动创建 ipset 白名单 + 配置 UFW 基础规则
# 兼容 Ubuntu 22.04

set -e  # 一旦出错就退出脚本

setname="in_bt_user_accept_ipset"

echo "🔍 检查或创建 ipset 集合：$setname"

if ipset list "$setname" >/dev/null 2>&1; then
  echo "✅ $setname 已存在，清空旧内容..."
  sudo ipset flush "$setname"
else
  echo "🆕 创建新的 ipset 集合：$setname"
  sudo ipset create "$setname" hash:ip
fi

# 定义白名单 IP 列表
ip_list=(
  10.0.0.0/24
  38.96.255.144
  194.127.193.144
  96.45.186.62
  216.106.181.230
  216.106.181.231
)

echo "🔍 检查 UFW 是否安装..."
if ! command -v ufw &> /dev/null; then
    echo "📦 UFW 未安装，正在安装..."
    sudo apt update -y
    sudo apt install ufw -y
else
    echo "✅ UFW 已安装"
fi

echo "⚙️ 重置并配置 UFW..."
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 开放常用端口
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 添加 IP 白名单
echo "🧱 添加 IP 白名单..."
for ip in "${ip_list[@]}"; do
  echo "   ➕ $ip"
  sudo ipset add "$setname" "$ip"
  sudo ufw allow from "$ip"
done

# 启用并重载 ufw
echo "🚀 启用防火墙..."
sudo ufw --force enable
sudo ufw reload

# 显示当前状态
echo "📋 当前防火墙状态："
sudo ufw status numbered
sudo ipset list "$setname"

```

### 3.2 通用版
```shell
#!/bin/bash
# 说明: 自动创建 ipset 白名单 + 配置 UFW 基础规则
# 兼容 Ubuntu 22.04

set -e  # 一旦出错就退出脚本
# 定义白名单 IP 列表
ip_list=(
  10.0.0.0/24
  61.111.129.142
  65.49.205.199
)

port_list=(
  80
  443
)

echo "🔍 检查 UFW 是否安装..."
if ! command -v ufw &> /dev/null; then
    echo "📦 UFW 未安装，正在安装..."
    sudo apt update -y
    sudo apt install ufw -y
else
    echo "✅ UFW 已安装"
fi

echo "⚙️ 重置并配置 UFW..."
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing


# 开放常用端口
echo "🧱 开放常用端口..."
for port in "${port_list[@]}"; do
  echo "   ➕ 端口 $port"
  sudo ufw allow "$port"/tcp
done

# 添加 IP 白名单
echo "🧱 添加 IP 白名单..."
for ip in "${ip_list[@]}"; do
  echo "   ➕ $ip"
  sudo ufw allow from "$ip"
done

# 启用并重载 ufw
echo "🚀 启用防火墙..."
sudo ufw --force enable
sudo ufw reload

# 显示当前状态
echo "📋 当前防火墙状态："
sudo ufw status numbered
```

