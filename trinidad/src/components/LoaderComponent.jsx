import React from 'react'
import './Loader.css'

const LoaderComponent = () => {
    return (
        <div className="inline">
            <h1>Nimekiri</h1>
            <div className='twn-loader'>
            <img className='loader' src={require("../assets/imgs/loader.svg").default} alt="loader" />
            </div>
        </div>
    )
}

export default LoaderComponent