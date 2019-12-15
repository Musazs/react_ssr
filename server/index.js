import React from 'react'
import { renderToString } from 'react-dom/server'
import express from "express"
import {StaticRouter, matchPath, Route} from 'react-router-dom'
import routes from '../src/app'
import { format } from 'path'
import {Provider} from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'

const store = getServerStore()
const app = express() 

//  家在使用静态资源
app.use(express.static('public'))

app.get('*', (req, res) => {
    // 存储网络亲求 
    const promises = [];
    console.log('routes', routes)
    routes.some(route => {
        const match = matchPath(req.path, route);
        console.log('if=======', match)
        if (match) {
            const { loadData } = route.component
            if (loadData) {
                promises.push(loadData(store))
            }
        }
    })

    

    //   等待所有网络请求
    Promise.race(promises).then(() => {
        //  判断 获取根据路由 渲染的嘴贱，并且拿到 loadData  方法
        // const Page = <App title="开本吧"></App>
        // 将react 组建 解析为 html 
        const content = renderToString(
            // react 服务端渲染 用 StaticRouter   客户端渲染使用 BrowRouter 不准确，大概是这个意思
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <Header></Header>
                    {routes.map(route => <Route {...route}></Route>)}
                </StaticRouter>
            </Provider>
        )
        res.end(`
            <html>
                <head>
                    <meta charset="UTF-8">
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
