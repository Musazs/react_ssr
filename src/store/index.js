// 首页逻辑
import axios from 'axios'
const GET_LIST =  'INDEX/GET_LIST'
const  changeList = list => ({
    type: GET_LIST,
    list
})

export const getIndexList = server => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:9090/api/course/list').then(res => {
            const {list} = res.data
            console.log('list', list)
            dispatch(changeList(list))
        })
    }
}

const defaultState = {
    list: []
}

export default(state=defaultState, action) => {
    console.log('11111111111state', state, action)
    switch(action.type) {
        case GET_LIST: 
            const newSate = {
                ...state,
                list: action.list
            }
            return newSate
        default: 
            return state
    }
}