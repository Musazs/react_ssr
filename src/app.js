import React, { useState } from 'react'
import {Route } from 'react-router-dom'
import Index from './container/index'
import About from './container/about'
import User from './container/user'
import NotFound from './container/notFound'
import './app.css'
// export default (
//     <div>
//         <Route path="/" exact component={Index}></Route>
//         <Route path="/about" exact component={About}></Route>
//     </div>
// ) 

// 改造 js 成配置  
export default [
    {
        path: '/',
        component: Index,
        exact: true, // 精确匹配
        key: 'index',
        // loadData: Index.loadData
    },
    {
        path: '/about',
        component: About,
        exact: true,
        key: 'about'
    },
    {
        path: '/user',
        component: User,
        exact: true,
        key: 'user'
    },
    {
        component: NotFound
    }
]