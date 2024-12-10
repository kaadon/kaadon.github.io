
# <center>KeyStore 生成</center>

## 1. 生成证书
```shell
keytool -genkey -v -keystore shelltv-net.keystore -keyalg RSA -keysize 4096 -validity 10000 -alias shelltv-net
```
