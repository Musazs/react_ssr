import React from 'react'
function widthStyle(Comp, styles) {

    return function (props) {
        if (props.staticContext) {
            props.staticContext.css.push(style._getCss())
        }
        return <Comp {...props} />
    }
}

export default widthStyle