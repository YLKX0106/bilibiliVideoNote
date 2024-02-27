# Ob生成B站视频时间戳笔记(改)

一个用于获取B站视频信息，配合[Media Extend插件](https://github.com/aidenlx/media-extended)以及其[B站视频拓展插件](https://github.com/aidenlx/mx-bili-plugin)做时间戳笔记的脚本。

## 目录

## 说明

原本代码现不可用，在[LumosLovegood/myScripts](https://github.com/LumosLovegood/myScripts)代码和模板的基础上修改而成。

使用b站api接口获取视频信息，接口来源[bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)中的[获取视频详细信息](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/video/info.md)。

## 使用方法

视频演示地址：

### 添加命令

1. 安装并启用[Quickadd](https://github.com/chhoumann/quickadd)插件，[Media Extend插件](https://github.com/aidenlx/media-extended)和[B站视频拓展插件](https://github.com/aidenlx/mx-bili-plugin)

2. 下载需要的脚本文件[bilibili.js](https://github.com/YLKX0106/bilibiliVideoNote/blob/init/bilibili.js)以及[示例模板](https://github.com/YLKX0106/bilibiliVideoNote/blob/init/VideoNote.md)(之后可以自定义模板)放到自己的obsidian库中

3. 在Quickadd中新建一个Macro命令，命令设置中添加`User Script`为[bilibili.js](https://github.com/YLKX0106/bilibiliVideoNote/blob/init/bilibili.js)，再添加一个以[示例模板](https://github.com/YLKX0106/bilibiliVideoNote/blob/init/VideoNote.md)为模板的Template命令，选择模板文件路径，开启`File Name Format`，在`File Name`中输入`{{value:filename}}`，完成之后点亮该命令的⚡符号以启用命令。

4. 命令面板启动该命令即可使用。

### 自定义模板

模板中可以使用以下字段

- {{VALUE:title}} ，视频标题
- {{VALUE:author}} ，视频上传者
- {{VALUE:videoDate}}，视频发布日期
- {{VALUE:link}}，视频的B站地址
- {{VALUE:cover}}，视频封面地址
- {{VALUE:parts}}，视频分集信息（没有的话返回空）
- {{VALUE:intro}}，视频简介
- {{VALUE:filename}}，去掉视频标题中的非法字符，用于生成笔记命名

遇到问题或者有想法欢迎提交issue。

