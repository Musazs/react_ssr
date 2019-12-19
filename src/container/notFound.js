import React from 'react'
import { Route } from 'react-router-dom'


function Status({code, children}) {
    return <Route render={({staticContext}) => {
        if (staticContext) {
            staticContext.statuscode = code
        }
        return children
    }}></Route>
}

function NotFound (props) {
    // 在渲染这个组件的时， 给props.staticContext 赋值404 
    console.log('noit', props)
    return <Status code={404}>
        <h2>哎呀，你找的页面不存在呀</h2>
        <img id="img_404" src="/404.jpg"></img>
    </Status>
}

export default NotFound