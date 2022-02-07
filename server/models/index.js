const Sequelize = require('sequelize')
const { database } = require('../config')

// 创建实例 配置数据库
const sequelize = new Sequelize(database.DATABASE, database.USERNAME, database.PASSWORD, {
  host: database.HOST,
  dialect: 'mysql',  // 'mysql'|'sqlite'|'postgres'|'mssql'
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    // 字段以下划线（_）来分割（默认是驼峰命名风格）  
    underscored: true ,
    //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    // 数据库中的表名与程序中的保持一致，否则数据库中的表名会以复数的形式命名
    freezeTableName: true
  }
})

sequelize.authenticate().then(() => {
  console.log('Connection has been esablished successfully.')
}).catch(err => {
  console.error('Unable to connect to the databases: ' + err)
})

module.exports = sequelize
