import React from 'react'
import ReactDom from 'react-dom'

import routes from '../src/app'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { getClientStore } from '../src/store/store'
import {Provider} from 'react-redux'
import Header from '../src/component/Header'
const store = getClientStore()


//  注水 客户端入口
const Page = (<Provider store={getClientStore()}>
    <BrowserRouter>
        <Header></Header>
        <Switch>
            {routes.map(route => <Route key={route.key} {...route}></Route>)}
        </Switch>
        
    </BrowserRouter>
</Provider>)

if (window.__context) {
    // ssr
    ReactDom.hydrate(Page, document.getElementById('root'))
} else {
    // csr
    ReactDom.render(Page, document.getElementById('root'))
}



