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
    // 解决请求方法一
    // if (req.url.startsWidth('/api/')) {
    //     // 不渲染页面， 做转发请求处理
    // }


    // 存储网络亲求 
    const promises = [];
    routes.some(route => {
        const match = matchPath(req.path, route);
        if (match) {
            const { loadData } = route.component
            if (loadData) {
                // 老师的解决 接口报错方法一
                const promise = new Promise((resolve, reject) => {
                    // 强制规避报错， 可以考虑在catch 加报错
                    loadData(store).then(resolve).catch(resolve)
                })
                promises.push(promise)
                // promises.push(loadData(store))
            }
        }
    })
    
    //   等待所有网络请求
    Promise.all(promises).then(() => {
        const context = {}
        //  判断 获取根据路由 渲染的嘴贱，并且拿到 loadData  方法
        // const Page = <App title="开本吧"></App>
        // 将react 组建 解析为 html 
        const content = renderToString(
            // react 服务端渲染 用 StaticRouter   客户端渲染使用 BrowRouter 不准确，大概是这个意思
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <Header></Header>
                    <Switch>
                        {routes.map(route => <Route {...route}></Route>)}
                    </Switch>
                   
                </StaticRouter>
            </Provider>
        )
        console.log('context===================================================', context)
        // 获取不到
        if(context.statuscode) {
            // 根据状态切换 和页面跳转
            res.status(context.statuscode)
        }

        if (context.aciton == 'REPLACE') {
            res.redirect(500, context.url);
        }
        res.end(`
            <html>
                <head>
                    <meta charset="UTF-8">
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                    <title>resct ssr</title>
                </head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                        window.__context = ${JSON.stringify(store.getState())}
                    </script>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        `)
    }).catch(() => {
        res.send('404')
    })
    
})

app.listen(9527, () => {
    console.log('监听9527已启动')
})
