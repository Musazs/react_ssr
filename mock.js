// 接口模拟

const express = require('express')
const app = express()

app.get('/api/course/list', (req, res) => {
    // 支持跨域调用
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT DELETE')
    res.header('Content-Type', 'application/json;charset=utf-8')
    res.json({
        code: 0,
        list: [
            {name: 'web全站0', id: 1},
            {name: 'web全站1', id: 2},
            {name: 'web全站2', id: 3},
            {name: 'web全站3', id: 4},
            {name: 'web全站4', id: 5},
            {name: 'web全站5', id: 6}
        ]
    })
})

app.get('/api/user/info', (req, res) => {
    // 支持跨域调用
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT DELETE')
    res.header('Content-Type', 'application/json;charset=utf-8')
    res.json({
        code: 0,
        data: {
            name: 'Musa',
            bast: '大圣'
        } 
    })
})

app.listen(9090, () => {
    console.log('mock, 加载并启动')
})