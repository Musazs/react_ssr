import React, { useState } from 'react'

function App (props) {
    const [count, setCount] = useState(1)
    return <div>
        <h1>hello, word {props.title}</h1>{count}
        <button onClick={ () => setCount(count+1)}>累加器</button>
    </div>
}

export default <App title="Musa"></App>