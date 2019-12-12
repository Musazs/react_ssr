import React from 'react'
import { renderToString } from 'react-dom/server'
import express from "express"
import App from '../src/app.js'

const app = express()

app.get('/', (req, res) => {
    const Page = <App></App>
    // 将react 组建 解析为 html 
    const content = renderToString(Page)
    res.end(`
        <html>
            <head>
                <meta charset="utf-8 />
                <title>resct ssr</title>
            </head>
            <body>
                <div id="root">
                    ${content}
                </div>
            </body>
        </html>
    `)
})

app.listen(9527, () => {
    console.log('监听9527已启动')
})
