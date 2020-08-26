/**
 * 这个文件是用来测试，在server.close后，进程退出后，存量请求是否能够正常响应。
 * 测试步骤：
 * 1. 启动服务： node test.js
 * 2. 找到pid： ps aux | grep test.js （假如pid为1111）
 * 3. 打开三个终端，按照顺序依次执行：终端1: curl http://127.0.0.1:5000
 *                               终端2: kill -HUP 1111
 *                               终端3: curl http://127.0.0.1:5000
 * 
 * 现象：终端1：请求会在10s后响应
 *      终端3：Failed to connect to 127.0.0.1 port 5000: Connection refused
 * 
 * 结论：我们监听了SIGHUP信号，把server close后，进程优雅退出，存量请求会继续响应，增量请求则会拒绝。 
 *  */

const http        = require('http')
const Koa         = require('koa')
const Router      = require('koa-router')
const app         = new Koa()
const router      = new Router()

router.get('/', async (ctx, next) => {
  // 这里用来测存量请求是否能够正常返回
  await new Promise((resove, reject) => {
    setTimeout(() => {
      resove(ctx)
    }, 10000)
  }).then((ctx) => {
    ctx.body = {name: 'ljh'}
  })
})

process.on('SIGHUP', () => {
  server.close(err => {
    process.exit(err ? 1 : 0);
  });
})

app.use(router.routes())

const server = http.createServer(app.callback());
server.listen(5000);


