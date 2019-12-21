import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import style from './index.css'
import widthStyle from '../withStyle'

function Index (props) {
    const [count, setCount] = useState(1)
    useEffect(() => {
        if (!props.list.length){
            // 客户端获取
            props.getIndexList()
        }
    }, []);
    return (<div className={style.container}>
                <h1 className={style.title}>hello, word {props.title} ----- {count}</h1>
                <button onClick={ () => setCount(count+1)}>累加器</button>
                <hr/>
                <ul>
                    {
                        props.list.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })
                    }
                </ul>
            </div>)
}

Index.loadData = (store) => {
    return store.dispatch(getIndexList())
}

export default connect(
    state => {
        return { list: state.index.list}
    },
    {getIndexList}
)(widthStyle(Index, style))