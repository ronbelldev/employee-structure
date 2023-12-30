import React from 'react'
import classNames from 'classnames'
import Avatar, { AvatarSizes } from '../Avatar'
import './index.scss'
import EmployeeName from '../EmployeeName'
import EditableField from '../EditableField'

const EmployeeSummary = ({
    src,
    email = 'email',
    firstName = 'firstName',
    lastName = 'LastName',
    isSelected,
    onClickEmployeeSummary,
    streetAddress,
    isBig,
    city,
    setEditedValues,
    editedValues,
    isEditing
 }) => {
    return (
        <div
            className={classNames('employee-summary', {
                selected: isSelected,
                big: isBig
            })}
            onClick={onClickEmployeeSummary}
        >
            <Avatar size={isBig ? AvatarSizes.BIG : AvatarSizes.SMALL} src={src} />
            <div className={classNames('employee-summary-details', {
                big: isBig
            })}>
                <EmployeeName
                    isEditing={isEditing}
                    firstName={firstName}
                    lastName={lastName}
                    setEditedValues={setEditedValues}
                    editedValues={editedValues}
                />
                <div className='employee-summary-email'>
                    <EditableField
                        value={editedValues?.email || email}
                        isEditing={isEditing}
                        onInputChange={email => setEditedValues?.({ ...(editedValues || {}), email })}
                    >
                        {email}
                    </EditableField>
                </div>
                {streetAddress && (
                    <div className='employee-summary-address'>
                        <EditableField
                            value={editedValues?.streetAddress || streetAddress}
                            isEditing={isEditing}
                            onInputChange={streetAddress => setEditedValues?.({ ...(editedValues || {}), streetAddress })}
                        >
                            {streetAddress},
                        </EditableField>
                        <div className='employee-summary-address-city'>
                            <EditableField
                                value={editedValues?.city || city}
                                isEditing={isEditing}
                                onInputChange={city =>  setEditedValues?.({ ...(editedValues || {}), city })}
                            >
                                {city}
                            </EditableField>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmployeeSummary
