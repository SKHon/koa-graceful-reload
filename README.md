## 介绍
一个koa服务的平滑启动小工具

## 实现原理
【start】在主进程中fork出n(n取决你机器的cpu核数)个子进程，在子进程中启动你的koa服务。

【gracefulReload】会给主进程发一个SIGHUP信号，告诉主进程要平滑重启了。然后主进程会告诉子进程，子进程收到通知后，先disconnect, 然后子进程退出，再在主进程中   fork出一个子进程。递归上述，直到把所有的子进程重启结束。

## 使用步骤
1. 全局安装
   npm install koa-hot -g

2. 启动koa应用【后面跟koa应用的入口文件的绝对路径】
   koa-hot start --path /xxx/app.js

3. 平滑重启koa应用【后面跟 主进程的pid】
   koa-hot gracefulReload --pid 11111    

## 关于验证存量请求是否能够正常响应
用example中的app.js即可验证，该koa服务中get请求: http://127.0.0.1:5000 延时5s返回结果。你可以先一个终端请求：curl http://127.0.0.1:5000。 然后进行gracefulReload操作，你会发现该请求会在5s后返回结果。

另外，可以查看example/test.js文件，里面有操作步骤。

## 平滑重启测试步骤
1. 可以用postman循环跑一个请求，设置1s的间隔。

2. postman跑的过程中，你可以改一下请求的返回结果，再gracefulReload一下。

3. 自己看返回结果，列表中的请求没有报错的请求，并且gracefulReload的前一个存量请求正常响应，增量请求的返回结果是修改之后的，响应正常。此时证明，你的koa服务已经平滑重启。

## 开发者
1. clone代码到本地
   git clone git@github.com:SKHon/koa-graceful-reload.git

2. 进入项目中bin目录下
   cd koa-graceful-reload/bin

3. 启动exapmle应用
   node koa-hot start --path ../example/app.js

4. 平滑启动app.js
   node koa-hot gracefulReload --pid 54734 ../example/app.js   

   



