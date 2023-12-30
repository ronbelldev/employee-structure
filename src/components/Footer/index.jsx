import React from 'react'
import './index.scss'
import Button from '../Button'

const Footer = ({ buttons = [] }) =>
  <div className='footer'>
    {buttons.map((buttonProps, index) =>
        <Button key={index} {...buttonProps} />
    )}
  </div>

export default Footer
