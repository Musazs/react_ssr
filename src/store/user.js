// 首页逻辑
import axios from 'axios'
const GET_LIST =  'INDEX/USER_LIST'
const  changeUserInfo = data => ({
    type: GET_LIST,
    data
})

export const getUserInfo = server => {
    return (dispatch, getState, $axios) => {
        return $axios.get('/api/user/info').then(res => {
            const {data} = res.data
            dispatch(changeUserInfo(data))
        })
    }
}

const defaultState = {
    userinfo: []
}

export default(state=defaultState, action) => {
    switch(action.type) {
        case GET_LIST: 
            const newSate = {
                ...state,
                userinfo: action.data
            }
            return newSate
        default: 
            return state
    }
}