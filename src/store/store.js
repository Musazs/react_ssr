//  数据存储入库
import {createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import indexReducer from './index'
import userReducer from './user'
import axios from 'axios'


const reducer = combineReducers({
    index: indexReducer,
    user: userReducer
})

const serverAxios = axios.create({
    baseURL: 'http://localhost:9090/'
})

const clientAxios = axios.create({
    baseURL: '/'
})

// 创建store
// const store = createStore(reducer, applyMiddleware(thunk))

// export default store

export const getServerStore = () => {
    // 服务端 通过server的dispath 获取，添加
    return  createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
    // 客户端
    // 通过 公共变量 window.__context  获取数据
    const defaultState = window.__context ? window.__context : {}
    return  createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}