const controller = require('../controller/user')

module.exports = (app, router) => {
  router.post('/login', controller.postLogin)
}