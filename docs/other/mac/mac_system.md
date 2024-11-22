# <center>Mac常用系统配置</center>

## 1. mac系统任务

### 1.1 创建任务配置

```text
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>KeepAlive</key>
        <true/>
        <key>Label</key>
        <string>ramdisk.intramdisk.startup</string>
        <key>ProgramArguments</key>
        <array>
            <string>bash</string>
            <string>/Users/codemiracle/.RamDisk/initramdisk.sh</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
        <key>StandardErrorPath</key>
        <string>/usr/local/var/log/initramdisk_error.log</string>
        <key>StandardOutPath</key>
        <string>/usr/local/var/log/initramdisk.log</string>
        <key>WorkingDirectory</key>
        <string>/Users/codemiracle/.RamDisk</string>
    </dict>
</plist>

```

### 1.2 任务执行
```shell
# 具体命令根据实际情况修改
#先设置权限
    sudo chown root:wheel /Library/LaunchDaemons/ae_scan_mac.*
    sudo chmod a+x /Library/LaunchDaemons/ae_scan_mac.sh
    sudo chmod 644 /Library/LaunchDaemons/ae_scan_mac.plist
#加载文件
    sudo launchctl load /Library/LaunchDaemons/ae_scan_mac.plist
#强制运行测试
    launchctl start /Library/LaunchDaemons/ae_scan_mac.plist
#检查任务是否执行
    sudo launchctl list |grep ramdisk.intramdisk.startup
    
```

## 2. brew常用命令
```shell
# 查看brew版本：
brew -v
# 更新brew版本：
brew update
# 本地软件库列表：
brew list
# 查看软件库版本：
brew list --versions
# 查找软件包：
brew search xxx #（xxx为要查找软件的关键词）
# 安装软件包：
brew install xxx #（xxx为软件包名称）
# 卸载软件包：
brew uninstall xxx
# 安装软件：
brew cask install xxx#（xxx为软件名称）
# 卸载软件：
brew cask uninstall xxx
# 查找软件安装位置：
which xxx #（xxx为软件名称）
```
