import React, { useState, useEffect } from 'react'
import './index.scss'
const EditableField = ({ isEditing, children, onInputChange, value }) => {
    const [editedValue, setEditedValue] = useState(value)

    useEffect(() => {
        let timerId
        if (onInputChange) {
            timerId = setTimeout(() => {
                onInputChange(editedValue)
            }, 300)

        }

        return () => clearTimeout(timerId)
    }, [editedValue])

   return isEditing ?
        <textarea
            className='text-area-input'
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
        />
        : children
}

export default EditableField
