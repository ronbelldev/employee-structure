import React from 'react'
import './index.scss'

export const AvatarSizes = {
    SMALL: 'small',
    BIG: 'big'
}

const AvatarSizesValues = {
    small: 48,
    big: 150
}


const Avatar = ({ size = AvatarSizes.SMALL, src }) =>
    <img
        className='avatar'
        width={AvatarSizesValues[size]}
        height={AvatarSizesValues[size]}
        src={src}
        alt={'Profile Picture'}
    />

export default Avatar
