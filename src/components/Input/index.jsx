import React from 'react'
import "./style.css"

const Input = ({lable,state,setState,type,placeholder}) => {
  return (
    <div className='input-box'>
        <p className='lable-input'>{lable}</p>
        <input
            value={state}
            placeholder={placeholder}
            onChange={(e) => setState(e.target.value)}
            type={type}
            className="input-details" />
    </div>
  )
}

export default Input