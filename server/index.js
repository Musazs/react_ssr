import React from 'react'
import { renderToString } from 'react-dom/server'
import express from "express"
import App from '../src/app.js'

const app = express()

//  家在使用静态资源
app.use(express.static('public'))

app.get('/', (req, res) => {
    // const Page = <App title="开本吧"></App>
    // 将react 组建 解析为 html 
    const content = renderToString(App)
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
