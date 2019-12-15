// 首页逻辑
import axios from 'axios'
const GET_LIST =  'INDEX/USER_LIST'
const  changeUserInfo = data => ({
    type: GET_LIST,
    data
})

export const getUserInfo = server => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:9090/api/user/info123123').then(res => {
            const {data} = res.data
            console.log('用户信息', data)
            dispatch(changeUserInfo(data))
        })
    }
}

const defaultState = {
    userinfo: []
}

export default(state=defaultState, action) => {
    console.log('11111111111state', state, action)
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