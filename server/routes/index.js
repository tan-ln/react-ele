const router = require('koa-router')() // 引入并实例化路由**推荐
const user = require('./user')

module.exports = function withRouter(app) {
  router.get('/', async (ctx) => {
    ctx.body = '首页'
  })

  user(app, router)
  
  // 注册路由
  app.use(router.routes()).use(router.allowedMethods())
}
