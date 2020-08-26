## 介绍
一个koa服务的平滑启动小工具

## 使用步骤
1. 全局安装
   npm install koa-hot -g

2. 启动koa应用【后面跟koa应用的入口文件的绝对路径】
   koa-hot start --path /xxx/app.js

3. 平滑重启koa应用【后面跟 主进程的pid】
   koa-hot gracefulReload --pid 11111    

## 开发者
1. clone代码到本地
   git clone git@github.com:SKHon/koa-graceful-reload.git

2. 进入项目中bin目录下
   cd koa-graceful-reload/bin

3. 启动exapmle应用
   node koa-hot start --path ../example/app.js

4. 平滑启动app.js
   node koa-hot gracefulReload --pid 54734 ../example/app.js   

   



