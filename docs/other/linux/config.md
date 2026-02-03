# <center> 常用配置 </center>

## 1. sshd_config配置  
```yaml
Port 34002
AddressFamily any
ListenAddress 0.0.0.0
ListenAddress ::

# 仅允许密钥登录
PasswordAuthentication no
ChallengeResponseAuthentication no
PubkeyAuthentication yes
PermitEmptyPasswords no

# root 允许登录，但必须使用密钥（不会因密码错误被撞库）
PermitRootLogin without-password

# 指定公钥存放路径
AuthorizedKeysFile .ssh/authorized_keys

# 禁止一切转发通道
AllowTcpForwarding no
GatewayPorts no
PermitTunnel no
X11Forwarding no
AllowAgentForwarding no

# 基本安全限制
StrictModes yes
MaxAuthTries 3
LoginGraceTime 30

# 保留必要的 SFTP 子系统
Subsystem sftp internal-sftp

# 防爆破参数（可选，但非常推荐）
MaxStartups 3:30:60
```
