# <center> Authapi Pay 文档</center>

## 1. 回调消息
### 1.1 充值
```text
{
  "type": "recharge",
  "data": {
       "hash": "eed615215b514d790d76c25853675a3b66e964f56fc7b6497240f3d157ac6222",
       "mid": "10",
       "status": 1,//0:失败,1成功
       "money": "19.119458",//金额
       "from_address": "TYKbrW8LN3EqwzvWGScZ21D5jLH1Y4WcNN",
       "address_id": 24,
       "address": "TPbVq59maB7aDzZGuQpB7nH68BEzpKSpKo",
       "type": 1,//1:trx 2:usdt
       "chain_time": 1676614041,
       "create_time": 1676614055,
       "update_time": 1676614055,
       "block": 48668856,
       "blockhash": "0000000002e6a0b81fda35d609389b06c3568179aee24fd80dc854ddb47cde80"
      }
}
```

### 1.2 提现TRX,USDT   以及提现状态withdraw_status
```text
//withdraw_trx,withdraw_usdt : 提交成功推送
//withdraw_status : 转账验证成功推送
{
  "type": "withdraw_trx",//withdraw_trx,withdraw_usdt,withdraw_status
  "data": {
     "id": 89,
     "block": "0",//withdraw_status会有值
     "blockhash": "",//withdraw_status会有值
     "hash": "c597df806e1fb6e3b09954dca56f43a6c356d0f2e001d4076546507b875af375",
     "transefer_status": 2,//0:验证失败, 1验证成功
     "status": 1,//提交成功1
     "type": 1,//1:trx 2:usdt
     "address": "TTiZnK2bfLxYtcsRyPvPK9gH99TBV65MD4",
     "from_address": "",//转账成功会有显示
     "money": 1.0,
     "create_time": "2023-02-16 16:29:11",
     "update_time": "2023-02-16 16:29:14",
     "delete_time": ""
    }
}
```

## 2. 搭建步骤
```shell
# 1.扫描区块
#[path] 系统目录
#请使用进程守护执行 例如 supervisor 
php [path]/think ScanBlock
# 2. 余额归集
#[path] 系统目录
#请使用进程守护执行 例如 supervisor 
php [path]/think queue:work --queue TronCapital_tronIntegrationFromUser
# 3. 充值分发
#[path] 系统目录
#请使用进程守护执行 例如 supervisor 
php [path]/think queue:work --queue SystemUpdate_ScanStore
# 4. 地址余额
#[path] 系统目录
#请使用进程守护执行 例如 supervisor 
php [path]/think queue:work --queue TronCapital_updateAddressMoney
# 5. 打款提现
#[path] 系统目录
#请使用进程守护执行 例如 supervisor 
php [path]/think queue:work --queue TronCapital_sendTronCapital
# 6. 消息推送
#[path] 系统目录
#请使用进程守护执行 例如 supervisor 
php [path]/think queue:work --queue MessagePush_PushUrl
# 7. 打款状态查询
#[path] 系统目录
#请使用进程守护执行 例如 supervisor 
php [path]/think queue:work --queue TronCapital_getTransactionStatus
```

## 3.搭建环境

```text
# mysql5.6
# php8.1   扩展必须:swoole,redis,gmp, 去除函数: putenv
# redis 需设置密码
# nginx
```