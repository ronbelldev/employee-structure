import React from 'react'
import './index.scss'

const Button = ({ onClick, text, isDisabled }) =>
    <button className="button" onClick={() => !isDisabled && onClick()} disabled={isDisabled}>
        {text}
    </button>

export default Button
