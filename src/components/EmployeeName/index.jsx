import React from 'react'
import './index.scss'
import classNames from 'classnames'
import EditableField from '../EditableField'

const EmployeeName = ({ firstName, lastName, isBig, isEditing, setEditedValues, editedValues }) =>
    <div className={classNames('employee-name', { big: isBig })}>
        <EditableField
            value={editedValues?.firstName || firstName}
            isEditing={isEditing}
            onInputChange={firstName => setEditedValues?.({ ...(editedValues || {}), firstName })}
        >
            {firstName}
        </EditableField>
            <div className='employee-name-last-name'>
                <EditableField
                    value={editedValues?.lastName || lastName}
                    isEditing={isEditing}
                    onInputChange={lastName => setEditedValues?.({ ...(editedValues || {}), lastName })}
                >
                    {lastName}
                </EditableField>
            </div>
    </div>

export default EmployeeName
