const koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa-cors')
const convert = require('koa-convert')

const app = new koa()
app.config = require('./config')

// 跨域
// convert 用于 旧式的Generate中间件 与 基于Promise的中间件 之间的转换，避免v3不能使用
app.use(convert(cors({
  origin: 'http://localhost:3000',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authenticate'],
  maxAge: 5,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content=Type', 'Authorization', 'Accept']
})))

// 表单提交对象使用 koa-body 解析
app.use(koaBody({
  formLimit: '5mb',
  jsonLimit: '5mb',
  textLimit: '5mb'
}))

const withRouter = require('./routes')
withRouter(app)

// 404
app.use(async (ctx) => {
  ctx.body = '404'
})

// 内部错误处理
app.on('error', function(err, ctx) {
  console.log('server error', err, ctx)
})

app.listen(app.config.port)
console.log(`server start on ${app.config.port}`)