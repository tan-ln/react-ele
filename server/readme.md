# koa2
> Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的

**开启服务 `node index`**

**创建数据库 ` CREATE DATABASE IF NOT EXISTS ele;`**

## 初始化
- `cd server`     
- 初始化 `package.json`     
`npm init -y`
- 新建 `index.js` 入口文件

## koa-body
```js
// 表单提交对象使用 koa-body 解析
app.use(koaBody({
  "formLimit": "5mb",
  "jsonLimit": "5mb",
  "textLimit": "5mb"
}))
```

## sequelize
> `Sequelize` 是一款基于 `Nodejs` 功能强大的异步 `ORM` 框架。(`ORM` 简单的讲就是对 `SQL` 查询语句的封装，让我们用对象的形式操作数据库，实际是一种 `Model` 和 `SQL` 的映射关系)

[](https://www.jianshu.com/p/ebf317311ed7https://www.jianshu.com/p/ebf317311ed7)
