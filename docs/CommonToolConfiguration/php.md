# <center>常用PHP配置</center>

## 安装第三方的php版本
```shell

    #mac
    brew tap shivammathur/php
    brew install shivammathur/php/php@7.4
```

## 大部分扩展安装
```shell
    /www/server/php/81/bin/phpize && ./configure --with-php-config=/www/server/php/81/bin/php-config && make && make install 
```


