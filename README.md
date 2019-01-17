### **electron-vue构建桌面端应用(仿网易云音乐--阉割版)**
#### **在此感谢：**
+ [electron官方][1]
+ [electron-vue：一个好用的脚手架工具][2]
+ [网易云音乐node.js版APi][3]

#### **技术**
+   `vue2.x + vuex + vue-router + webpack3.x + axios + electron`
+   采取`element-ui`，在此感谢饿了么团队
+   接口采取`网易云音乐node.js接口`，再次感谢
+   采取`vue-devtools`工具来检查组件以及`vuex`仓储
+   采用`vue-lazyloader`插件实现图片预加载

#### **项目运行：**

+   `git clone https://github.com/magicwangxuanqi/cloud.git`
+   `cd cloud & npm install`
+   `npm run dev`
   
#### **打包：**
+   一键打包：`npm run build`
+   windows：`npm run build:win32`
+   linux：`npm run build:win32`
+   maxOs：`npm run build:win32`

#### **下载：**
+   windows：
+   linux：
+   maxOs：

#### **简单介绍：**
+   掘金看到很多人采用electron搭建桌面应用程序，萌生了打造一个桌面应用的想法
+   目前在网上`网易云音乐的node.js接口`是比较全面而且方便使用的
+   感觉上用单页面的方式构建比较友好，对于react本人不是很熟，angular也没怎么用过，因此采取了vue作为前端开发框架
+   登陆部分依照接口提供的方法进行异步请求，在路由中添加权限认证；登录操作过程中部分接口总是报301，发现axios默认不会传递cookie，因此给axios拦截器设置`withCredentials = true`来解决此问题，同时还可以解决跨域

  [1]: https://electronjs.org/
  [2]: https://github.com/SimulatedGREG/electron-vue
  [3]: https://github.com/Binaryify/NeteaseCloudMusicApi
