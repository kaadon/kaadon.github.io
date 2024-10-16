# <center>打包DMG</center>

## 1. 参数说明
> create-dmg 工具用于在 macOS 上创建 DMG 文件。以下是常用参数及其说明：
```text
--overwrite：如果存在，覆盖现有的 DMG 文件。
--dmg-title：DMG 窗口的标题。
--window-size：DMG 窗口的大小（宽度 高度）。
--icon：DMG 中使用的图标文件路径。
--background：DMG 窗口的背景图像路径。
--icon-size：DMG 窗口中图标的大小。
--app-drop-link：在 DMG 中添加指向 Applications 文件夹的链接。
--hide-extension：隐藏 DMG 文件的扩展名。
--format：DMG 文件的格式（例如，UDBZ，UDZO）。
--volname：DMG 的卷名。
--no-internet-enable：不启用 DMG 的互联网访问。
--eula：挂载 DMG 时显示的 EULA 文件路径。
```
## 2. 示例

```shell
    create-dmg 'KaadonTools Installer.dmg' ./KaadonTools --overwrite --dmg-title="MyApp Installer" --window-size 800 400  --icon ./appicon.png
```
