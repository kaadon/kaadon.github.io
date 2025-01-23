#宝塔安装

## unbutu22.04安装宝塔

### 1.1 安装宝塔

#### 1.1.1 专业版
```shell
    URL=https://www.aapanel.com/script/install_pro_en.sh && if [ -f /usr/bin/curl ];then curl -ksSO $URL ;else wget --no-check-certificate -O install_pro_en.sh $URL;fi;bash install_pro_en.sh aa372544
```

#### 1.1.2 免费版
```shell
    URL=https://www.aapanel.com/script/install_7.0_en.sh && if [ -f /usr/bin/curl ];then curl -ksSO "$URL" ;else wget --no-check-certificate -O install_7.0_en.sh "$URL";fi;bash install_7.0_en.sh aapanel
```


