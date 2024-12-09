# <center>制作IOS 免签名书签</center>

## 1. 描述文件模板
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>ConsentText</key>
	<dict>
		<key>default</key>
		<string>{描述信息}</string>
	</dict>
	<key>DurationUntilRemoval</key>
	<integer>{到期自动移除}</integer>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>FullScreen</key>
			<true/>
			<key>Icon</key>
			<data>
			{base64图标}
			</data>
			<key>IgnoreManifestScope</key>
			<true/>
			<key>IsRemovable</key>
			<true/>
			<key>Label</key>
			<string>{名称}</string>
			<key>PayloadDescription</key>
			<string>配置 Web Clip 设置</string>
			<key>PayloadDisplayName</key>
			<string>Web Clip</string>
			<key>PayloadIdentifier</key>
			<string>com.apple.webClip.managed.{UUID}</string>
			<key>PayloadType</key>
			<string>com.apple.webClip.managed</string>
			<key>PayloadUUID</key>
			<string>{UUID}</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
			<key>Precomposed</key>
			<false/>
			<key>URL</key>
			<string>{域名URL}</string>
		</dict>
	</array>
	<key>PayloadDescription</key>
	<string>{描述信息}</string>
	<key>PayloadDisplayName</key>
	<string>{名称}</string>
	<key>PayloadIdentifier</key>
	<string>{标识符}</string>
	<key>PayloadOrganization</key>
	<string>{组织}</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>{UUID2}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>
```

## 2. 使用SSL证书签名:
- 使用ssl签名证书
```shell
    openssl smime -sign -in xx.mobileconfig -out xx.signed.mobileconfig  -signer ./fullchain.pem -inkey privkey.pem -certfile fullchain.pem -outform der -nodetach
```



