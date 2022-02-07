const md5 = require('md5')
const UserModel = require('../models/user')
// 需要引入执行  创建 user 表
const createTable = require('../lib/mysql')

const postLogin = async (ctx) => {

  const { phone, password } = ctx.request.body
  const pwd = md5(password)
  console.log(pwd)

  ctx.body = {
    code: 200,
    message: 'success'
  }

  // await UserModel.findOne({
  //   where: {
  //     phone,
  //     password
  //   },
  //   defaults: {
      
  //   }
  // }).then(res => {
  //   ctx.body = {
  //     code: 200,
  //     message: 'success'
  //   }
  //   console.log(res)
  // }).catch(err => {
  //   console.log(err)
  // })
}

module.exports = {
  postLogin
}