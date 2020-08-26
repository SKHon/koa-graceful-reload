const http        = require('http')
const Koa         = require('koa')
const Router      = require('koa-router')
const app         = new Koa()
const router      = new Router()

router.get('/', async (ctx, next) => {
  // 这里用来测存量请求是否能够正常返回
  await new Promise((resove, reject) => {

    // 模拟5s返回，来验证存量请求是否能够正常响应！
    setTimeout(() => {
      resove(ctx)
    }, 5000)

  }).then((ctx) => {
    ctx.body = {name: 'ljh'}
  })
})

app.use(router.routes())

const server = http.createServer(app.callback());
server.listen(5000);


