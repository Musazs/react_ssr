import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'
import { Redirect }  from 'react-router-dom'

function User (props) {
    // return <div>
    //     <h1>{props.userinfo.name}, 你们最棒的人是{props.userinfo.base}</h1>
    // </div>

    // 判断没登陆逻辑， 跳转到登录页
    return <Redirect to="/about"></Redirect>
}

User.loadData = (store) => {
    return store.dispatch(getUserInfo())
}

export default connect(
    state => {
        return { userinfo: state.user.userinfo }
    },
    // {getIndexList}
)(User)