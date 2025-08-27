## <center> Git 常用</center>

### 1. 提取当前提交的git文件,按当前目录结构输出
```shell
#!/bin/bash

# 设置输出目录
OUTPUT_DIR="./output"

# 清空并创建输出目录
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# 获取当前提交变更的文件列表（保留新增/修改文件）
FILES=$(git diff-tree --no-commit-id --diff-filter=AM --name-only -r HEAD)

# 复制每个文件到 output 中，保持原目录结构
for file in $FILES; do
    # 创建目录
    mkdir -p "$OUTPUT_DIR/$(dirname "$file")"
    # 复制文件
    cp "$file" "$OUTPUT_DIR/$file"
done

echo "✅ 已复制以下文件到 $OUTPUT_DIR:"
echo "$FILES"
# 打包输出目录为 zip 文件,使用当前修订号命名
OUTPUT_DIR_ZIP="output_$(git rev-parse --short HEAD)"
zip -r "$OUTPUT_DIR_ZIP.zip" "$OUTPUT_DIR"
echo "✅ 正在打包输出目录为 $OUTPUT_DIR_ZIP.zip"
# 删除输出目录
rm -rf "$OUTPUT_DIR"

```
