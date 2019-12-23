# UMS-UI
无人机管理界面
参照地址如下：
https://github.com/baidu-openmap-trace/web-demo-v3


(1) 首先通过[安装nodejs](https://nodejs.org/en/)获取到npm工具包。
(2) 接着打开命令行使用npm安装FIS3: npm install -g fis3 更多FIS3资料请参考官网 。之后输入fis3验证安装成功。
(3) 之后将代码库完整下载并解压到项目路径，执行npm install安装package.json中定义的依赖的包内容。
(4) 在1.2节的最后，提到了推荐申请两个AK。接下来对调用JSAPI的AK进行配置(下文统一称AK 1)。选择自己常用的编辑器。打开./manager.html。查看代码24行
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的AK1&callback=mapControl.initMap"></script>
此处将AK 1替换掉"您的AK1"并保存修改。

(5) 配置好AK 1后重新回到命令行，cd到项目的根目录。执行fis3 release demo 如果已经看过了FIS3的文档，那么就会理解这行命令的作用是根据fis-config.js文件的配置去编译DEMO。在fis-config.js中，已经写好了默认的编译规则。 
按照默认的配置，项目此时已经被发布到本地的Web Server。接着在命令行输入fis3 server start来启动打开网页。
如果看到上图的目录结构，就说明项目已经发布成功了。接下来点击目录中的manager.html进入到管理台界面，此时的URL是http://127.0.0.1:8080/manager.html
(6) 到此为止我们已经能够在自己的本地环境中查看没有任何数据管理台了，接下来需要将您的鹰眼service_id和之前准备好的AK 2以参数的形式添加到URL中。例如http://127.0.0.1:8080/manager.html?service_id=111111&ak=FDe8fsahjkfaskhfcz就可以看到自己的数据了。
(7) 截至上一步，项目环境已经走通了。大家在开发过程中，可以使用fis3 release demo -wl组合命令，这样代码更新保存之后，FIS3会自动编译，并刷新浏览器查看最新效果。如果有更多的构建需求，请参考FIS3文档。