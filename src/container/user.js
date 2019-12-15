import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'

function User (props) {
    console.log(props)
    return <div>
        <h1>{props.userinfo.name}, 你们最棒的人是{props.userinfo.base}</h1>
    </div>
}

User.loadData = (store) => {
    return store.dispatch(getUserInfo())
}

export default connect(
    state => {
        console.log('=======', state)
        return { userinfo: state.user.userinfo }
    },
    // {getIndexList}
)(User)