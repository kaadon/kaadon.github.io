# MinIO 部署文档

> **MinIO** 是高性能、兼容 AWS S3 协议的开源对象存储服务，适用于私有云、AI/ML 数据集、备份归档等场景。

---

## 目录

- [1. Compose 配置](#compose)
- [2. 启动与验证](#startup)
- [3. 生产优化建议](#production)
- [4. 常用环境变量](#env)
- [5. S3 连接示例](#s3)

---

## 1. Compose 配置 {#compose}

```yaml
services:
  minio:
    image: quay.io/minio/minio:latest
    container_name: minio
    restart: always
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"   # S3 API（SDK / 文件上传）
      - "9001:9001"   # Web Console（管理界面）
    environment:
      MINIO_ROOT_USER: "minioadmin"
      MINIO_ROOT_PASSWORD: "minioadmin"
    volumes:
      - ./data:/data
    networks:
      - docker
    healthcheck:
      test: ["CMD", "mc", "ready", "local"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 15s
    logging:
      driver: "json-file"
      options:
        max-size: "50m"
        max-file: "5"
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2G
        reservations:
          memory: 512M

networks:
  docker:
    external: true
```

> 外部网络 `docker` 需提前创建：`docker network create docker`

---

## 2. 启动与验证 {#startup}

```bash
# 首次使用：创建外部网络
docker network create docker

# 后台启动
docker compose up -d

# 查看运行状态
docker compose ps

# 实时查看日志
docker compose logs -f minio
```

启动成功后访问 Web Console：

| 地址 | 说明 |
|------|------|
| `http://<host>:9000` | S3 API 端点 |
| `http://<host>:9001` | Web 管理控制台 |

默认账号：`minioadmin` / `minioadmin`（**生产环境请务必修改**）

---

## 3. 生产优化建议 {#production}

| 项目 | 建议 |
|------|------|
| **账号安全** | 修改 `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD`，避免使用默认值 |
| **数据目录** | 将 `./data` 改为独立数据盘路径，如 `/mnt/data/minio` |
| **纠删码** | 多盘模式：`server /data{1...4}` 开启纠删码保护，防止单盘故障丢数据 |
| **HTTPS** | 通过 Nginx / Traefik 反向代理终止 TLS，或配置 MinIO 内置证书 |
| **资源限制** | 根据实际业务调整 `cpus` 与 `memory` 上限 |
| **镜像版本** | 锁定具体版本号（如 `RELEASE.2024-xx-xx`），避免 `latest` 引入破坏性更新 |

---

## 4. 常用环境变量 {#env}

```yaml
environment:
  MINIO_ROOT_USER: "your_admin"                              # 管理员用户名
  MINIO_ROOT_PASSWORD: "your_strong_password"               # 管理员密码（至少 8 位）
  MINIO_VOLUMES: "/data"                                     # 数据目录
  MINIO_SITE_NAME: "my-minio"                               # 站点名称（可选）
  MINIO_BROWSER_REDIRECT_URL: "https://console.example.com" # Console 外部访问地址
```

---

## 5. S3 连接示例 {#s3}

> MinIO 完全兼容 AWS S3 协议，只需将 `endpoint` 指向 MinIO 的 **9000 端口**即可复用现有 S3 SDK。

### AWS CLI

```bash
# 配置凭证
aws configure set aws_access_key_id minioadmin
aws configure set aws_secret_access_key minioadmin

# 列出所有 Bucket
aws s3 ls --endpoint-url http://127.0.0.1:9000

# 创建 Bucket
aws s3 mb s3://my-bucket --endpoint-url http://127.0.0.1:9000

# 上传文件
aws s3 cp ./test.txt s3://my-bucket/ --endpoint-url http://127.0.0.1:9000

# 下载文件
aws s3 cp s3://my-bucket/test.txt ./test.txt --endpoint-url http://127.0.0.1:9000
```

---

### Python（boto3）

```python
import boto3

s3 = boto3.client(
    "s3",
    endpoint_url="http://127.0.0.1:9000",
    aws_access_key_id="minioadmin",
    aws_secret_access_key="minioadmin",
    region_name="us-east-1",
)

# 创建 Bucket
s3.create_bucket(Bucket="my-bucket")

# 上传文件
s3.upload_file("test.txt", "my-bucket", "test.txt")

# 下载文件
s3.download_file("my-bucket", "test.txt", "downloaded.txt")

# 生成预签名 URL（有效期 1 小时）
url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-bucket", "Key": "test.txt"},
    ExpiresIn=3600,
)
print(url)
```

---

### Go（aws-sdk-go-v2）

```go
package main

import (
    "context"
    "fmt"

    "github.com/aws/aws-sdk-go-v2/aws"
    "github.com/aws/aws-sdk-go-v2/config"
    "github.com/aws/aws-sdk-go-v2/credentials"
    "github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
    cfg, _ := config.LoadDefaultConfig(context.TODO(),
        config.WithRegion("us-east-1"),
        config.WithCredentialsProvider(
            credentials.NewStaticCredentialsProvider("minioadmin", "minioadmin", ""),
        ),
    )

    client := s3.NewFromConfig(cfg, func(o *s3.Options) {
        o.BaseEndpoint = aws.String("http://127.0.0.1:9000")
        o.UsePathStyle = true // MinIO 必须启用 path-style
    })

    result, _ := client.ListBuckets(context.TODO(), &s3.ListBucketsInput{})
    for _, b := range result.Buckets {
        fmt.Println(*b.Name)
    }
}
```

---

### PHP（aws/aws-sdk-php）

```php
<?php
require 'vendor/autoload.php';

use Aws\S3\S3Client;

$s3 = new S3Client([
    'version'                 => 'latest',
    'region'                  => 'us-east-1',
    'endpoint'                => 'http://127.0.0.1:9000',
    'use_path_style_endpoint' => true,  // MinIO 必须启用
    'credentials'             => [
        'key'    => 'minioadmin',
        'secret' => 'minioadmin',
    ],
]);

// 上传文件
$s3->putObject([
    'Bucket'     => 'my-bucket',
    'Key'        => 'test.txt',
    'SourceFile' => '/path/to/test.txt',
]);

// 生成预签名 URL（1 小时有效）
$cmd     = $s3->getCommand('GetObject', ['Bucket' => 'my-bucket', 'Key' => 'test.txt']);
$request = $s3->createPresignedRequest($cmd, '+1 hour');
echo (string) $request->getUri();
```

---

> **注意**：Go 与 PHP SDK 连接 MinIO 时必须开启 `path-style`，否则请求会因 virtual-host 域名解析失败。
