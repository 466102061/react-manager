# react-manager

这是一个运用react+redux+webpack为主流框架搭建的前端项目的后台框架。其中用react来搭建前端页面，以redux来实现页面间的数据共享与一致性，webpack打包部署。

性能方面：
1.路由采用按需分割加载，大大缩短首屏加载等待时间。
2.每个组件只有当state或者props发生改变时，才允许组件更新，大大提高组件性能。
3.当图片小于5kb时，采用64位编码的方式打包图片，减小http请求次数。
4.css单独打包压缩。
5.js单独打包压缩等。

##### 备注：此项目仅用于学习交流，不可用于任何商业用途

### 技术栈

react/react-router/webpack/nodejs

### 运行项目

1.安装包 npm install

2.启动服务 npm run start

3.浏览 http://localhost:9090/


### 部分页面截图预览

![image](https://github.com/466102061/react-manager/blob/master/app/static/screenshots/login@2x.png)
![image](https://github.com/466102061/react-manager/blob/master/app/static/screenshots/home@2x.png)
![image](https://github.com/466102061/react-manager/blob/master/app/static/screenshots/setting@2x.png)
