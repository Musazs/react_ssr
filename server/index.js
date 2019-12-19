import React from 'react'
import { renderToString } from 'react-dom/server'
import express from "express"
import {StaticRouter, matchPath, Route, Switch} from 'react-router-dom'
import routes from '../src/app'
import { format } from 'path'
import {Provider} from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'
import proxy from "http-proxy-middleware";

// import allSettled from '../src/libs/allSettled'

// allSettled(); // 判断是否可之行 promis.eallSettled方法

const store = getServerStore()
const app = express() 

//  家在使用静态资源
app.use(express.static('public'))

// 解决服务端请求方法二 客户端的API请求
app.use(
    '/api',
    proxy({
        target: 'http:localhost:9090',
        changeOrigin: true
    })
)

app.get('*', (req, res) => {
    // 获取 根据路由渲染出的组建，并且拿到 loadData 方法，获取数据
    // 存储所有网络请求
    const promises = []
    console.log(routes)
    routes.some(route => {
      const match = matchPath(req.path, route)
      if (match) {
        const { loadData } = route.component
        if (loadData) {
          promises.push(loadData(store))
        }
      }
    })
    // 等待所有网络请求结束再渲染
    Promise.all(promises).then(() => {
      const context = {}
      // 把react组件，解析成html
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Header></Header>
            <Switch>
              {routes.map(route => {
                return <Route {...route}></Route>
              })}
            </Switch>
          </StaticRouter>
        </Provider>
      )
      if (context.statuscode) {
        // 状态切换和页面跳转
        res.status(context.statuscode)
      }
      if (context.action === "REPLACE") {
        res.redirect(301, context.url)
      }
      res.send(`
      <html>
        <head>
          <meta charset='utf-8'/>
          <title>react ssr</title>
        </head>
        <body>
          <div id='root'>${content}</div>
          <script>
            window.__context=${JSON.stringify(store.getState())}
          </script>
          <script src='/bundle.js'></script>
        </body>
      </html>`)
    }).catch((err) => {
      res.send('报错页面: 500')
    })
  
  
  })

app.listen(9527, () => {
    console.log('监听9527已启动')
})
