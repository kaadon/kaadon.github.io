# <center>NFS配置示例</center>

## NFS服务端配置

```shell
    # linux centos7
    yum install -y nfs-utils && yum install -y rpcbind
    systemctl enable rpcbind.service 
    systemctl enable nfs-server.service 
    systemctl start rpcbind.service 
    systemctl start nfs-server.service
```

## NFS服务端重载
```shell
    exportfs -a
    systemctl restart nfs
    systemctl restart rpc
    systemctl restart rpcc
```

## NFS服务端配置[linux]
```shell
[share_path] [IP段]/24(rw,async,insecure,no_subtree_check,all_squash,no_subtree_check,anonuid=1000,anongid=1000).
```

## NFS客户端配置[linux]
```shell
    echo "[ip]:[remote_path] [local_path] nfs defaults 0 0" >> /etc/fstab
    echo "[ip]:[remote_path] [local_path] nfs defaults 0 0" >> /etc/fstab
```


## NFS客户端配置[macos]
```shell
    mount_nfs -P [ip]:[remote_path] [local_path]
```


