import React from 'react'
import './style.css'
const Button = ({btnName,isBlue,onclick,disabled}) => {
    return (
        <div>
            <button className={isBlue ? 'btn':'btn-blue'} onClick={onclick} disabled={disabled} >{btnName}</button>
        </div>
    )
}

export default Button