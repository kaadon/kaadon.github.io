# <center>图片处理</center>

## 1. 开发端:图片处理为webp

```javascript
const fs = require('fs').promises;
const path = require('path');
const webp = require('webp-converter');

// 授予 webp-converter 权限
webp.grant_permission();

async function generateWebp(dir, file) {
    const filePrefix = file.substring(0, file.lastIndexOf('.'));
    const sourceFile = path.join(dir, file);
    const webpFile = path.join(dir, `${filePrefix}.webp`);

    try {
        // 检查目标 WebP 文件是否已存在
        const webpExists = await fs.stat(webpFile).then(() => true).catch(() => false);
        if (webpExists) {
            console.log(`WebP file already exists: ${webpFile}`);
            return;
        }

        // 调用 webp 转换工具
        const result = await webp.cwebp(sourceFile, webpFile, '-q 80'); // 设置质量为 80
        console.log(`Converted: ${sourceFile} -> ${webpFile}`);
        console.log(result);
    } catch (error) {
        console.error(`Error converting file ${sourceFile}:`, error.message);
    }
}

async function scanDirectory(directoryPath) {
    try {
        // 读取目录内容
        const files = await fs.readdir(directoryPath, { withFileTypes: true });

        // 遍历文件和子目录
        for (const file of files) {
            const filePath = path.join(directoryPath, file.name);

            if (file.isFile()) {
                // 检查文件类型是否为 PNG 或 JPG
                if (file.name.endsWith('.png') || file.name.endsWith('.jpg')) {
                    await generateWebp(directoryPath, file.name);
                }
            } else if (file.isDirectory()) {
                // 递归处理子目录
                await scanDirectory(filePath);
            }
        }
    } catch (error) {
        console.error(`Error scanning directory ${directoryPath}:`, error.message);
    }
}

// 主函数
(async function main() {
    const directoryPath = path.resolve(__dirname, 'assets');
    console.log(`Starting scan in directory: ${directoryPath}`);
    await scanDirectory(directoryPath);
    console.log('Scan completed.');
})();

```
## 2. 本地:图片处理为webp
### 1. 安装
```shell
# unbutu 
  sudo apt-get install webp
```
```shell
# mac
  brew install webp
```
```shell
# centos
  yum install libwebp-tools
```
### 2. 转换
```shell
### 1. 转换
```shell

find . -type f \( -iname "*.jpg" -o -iname "*.png" \) | while read -r file; do
  out="${file%.*}.webp"
  cwebp -q 80 "$file" -o "$out"
done
```
