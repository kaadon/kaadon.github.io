# <center> CDN:cloudflare  </center>

## 1. 缓存清除
```shell


```

## 2. 禁止IPV6 
```shell
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/[域名id]/settings/ipv6" \
     -H "X-Auth-Email: [邮箱]" \
     -H "X-Auth-Key: [key]" \
     -H "Content-Type: application/json" \
     -d '{
        "value": "off"
     }'
```

