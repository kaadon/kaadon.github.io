<center> Git 常用脚本 </center>


### 1. 提取当前提交的git文件,按当前目录结构输出
```shell
#!/bin/bash

# ============================================================
# Git提交文件导出脚本
# ============================================================
# 功能: 提取指定Git提交的所有修改文件,按原目录结构打包成zip
# 用法: ./export_commit.sh [commit_hash]
# ============================================================

# 如果没有提供参数,提示用户输入
if [ -z "$1" ]; then
    echo "============================================================"
    echo "Git提交文件导出工具"
    echo "============================================================"
    echo ""
    echo "请输入要导出的提交哈希(commit hash):"
    echo ""
    echo "最近的提交:"
    git log --oneline -10
    echo ""
    echo -n "请输入提交哈希: "
    read COMMIT_HASH

    # 检查是否输入了内容
    if [ -z "$COMMIT_HASH" ]; then
        echo "❌ 错误: 未输入提交哈希"
        exit 1
    fi
else
    COMMIT_HASH="$1"
fi

# 设置输出目录和zip文件名
OUTPUT_DIR="export_${COMMIT_HASH:0:8}"
ZIP_FILE="runtime/commit_${COMMIT_HASH:0:8}_$(date +%Y%m%d_%H%M%S).zip"

echo "============================================================"
echo "Git提交文件导出工具"
echo "============================================================"
echo "提交哈希: $COMMIT_HASH"
echo "输出目录: $OUTPUT_DIR"
echo "压缩文件: $ZIP_FILE"
echo "============================================================"

# 检查是否在git仓库中
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ 错误: 当前目录不是Git仓库"
    exit 1
fi

# 检查提交是否存在
if ! git cat-file -e "$COMMIT_HASH^{commit}" 2>/dev/null; then
    echo "❌ 错误: 提交 $COMMIT_HASH 不存在"
    exit 1
fi

# 清理旧的输出目录
if [ -d "$OUTPUT_DIR" ]; then
    echo "清理旧的输出目录..."
    rm -rf "$OUTPUT_DIR"
fi

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 获取该提交修改的所有文件
echo ""
echo "正在提取文件列表..."
FILES=$(git diff-tree --no-commit-id --name-only -r "$COMMIT_HASH")

if [ -z "$FILES" ]; then
    echo "❌ 错误: 提交中没有文件变更"
    exit 1
fi

# 统计文件数量
FILE_COUNT=$(echo "$FILES" | wc -l | tr -d ' ')
echo "找到 $FILE_COUNT 个文件"
echo ""

# 逐个复制文件
COPIED_COUNT=0
SKIPPED_COUNT=0

echo "开始复制文件..."
while IFS= read -r file; do
    if [ -f "$file" ]; then
        # 获取文件所在目录
        file_dir=$(dirname "$file")

        # 在输出目录中创建相同的目录结构
        mkdir -p "$OUTPUT_DIR/$file_dir"

        # 复制文件
        cp "$file" "$OUTPUT_DIR/$file"

        echo "✓ $file"
        ((COPIED_COUNT++))
    else
        echo "⊘ $file (文件已删除或不存在)"
        ((SKIPPED_COUNT++))
    fi
done <<< "$FILES"

echo ""
echo "文件复制完成:"
echo "  - 成功: $COPIED_COUNT 个"
echo "  - 跳过: $SKIPPED_COUNT 个"
echo ""

# 创建提交信息文件
echo "生成提交信息..."
cat > "$OUTPUT_DIR/COMMIT_INFO.txt" <<EOF
============================================================
Git提交信息
============================================================

提交哈希: $COMMIT_HASH
导出时间: $(date '+%Y-%m-%d %H:%M:%S')

提交详情:
$(git show --quiet --pretty=format:"作者: %an <%ae>%n时间: %ad%n%n提交信息:%n%s%n%n%b" "$COMMIT_HASH")

============================================================
文件变更列表 (共 $FILE_COUNT 个文件)
============================================================

$FILES

============================================================
EOF

echo "✓ 提交信息已保存到 $OUTPUT_DIR/COMMIT_INFO.txt"
echo ""

# 打包成zip
echo "正在创建压缩包..."
if command -v zip >/dev/null 2>&1; then
    # 使用zip命令
    cd "$OUTPUT_DIR"
    zip -r "../$ZIP_FILE" . > /dev/null
    cd ..
    rm -rf "$OUTPUT_DIR"
    # 获取zip文件大小
    ZIP_SIZE=$(du -h "$ZIP_FILE" | cut -f1)

    echo "✓ 压缩包创建成功!"
    echo ""
    echo "============================================================"
    echo "导出完成!"
    echo "============================================================"
    echo "压缩文件: $ZIP_FILE"
    echo "文件大小: $ZIP_SIZE"
    echo "输出目录: $OUTPUT_DIR (可删除)"
    echo "============================================================"
    echo ""
    echo "提示:"
    echo "  - 压缩包中包含所有文件的原始目录结构"
    echo "  - COMMIT_INFO.txt 包含提交的详细信息"
    echo "  - 可安全删除临时目录: rm -rf $OUTPUT_DIR"
else
    echo "⚠️  警告: zip命令不可用"
    echo "文件已提取到: $OUTPUT_DIR"
    echo "请手动压缩该目录"
fi

echo ""
echo "完成!"
```
