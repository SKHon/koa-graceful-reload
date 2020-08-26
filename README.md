## 介绍
一个koa服务的平滑启动小工具

## 使用步骤
1. 全局安装
   npm install koa-hot -g

2. 启动koa应用【后面跟koa应用的入口文件路径，绝对路径和相对路径都可以】
   koa-hot start --path app.js

3. 平滑重启koa应用【后面跟 主进程的pid】
   koa-hot gracefulReload --pid 11111    



