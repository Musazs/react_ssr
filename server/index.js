import React from 'react'
import { renderToString } from 'react-dom/server'
import express from "express"
import {StaticRouter} from 'react-router-dom'
import App from '../src/app.js'
import { format } from 'path'
import {Provider} from 'react-redux'
import store from '../src/store/store'

const app = express() 

//  家在使用静态资源
app.use(express.static('public'))

app.get('*', (req, res) => {
    //  判断 获取根据路由 渲染的嘴贱，并且拿到 loadData  方法
    // const Page = <App title="开本吧"></App>
    // 将react 组建 解析为 html 
    const content = renderToString(
        // react 服务端渲染 用 StaticRouter   客户端渲染使用 BrowRouter 不准确，大概是这个意思
        <Provider store={store}>
            <StaticRouter location={req.url}>
                {App}
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
                <div id="root">
                    ${content}
                </div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `)
})

app.listen(9527, () => {
    console.log('监听9527已启动')
})
