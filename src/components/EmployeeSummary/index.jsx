import React, { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import Avatar, { AvatarSizes } from '../Avatar'
import EmployeeName from '../EmployeeName'
import ArrowUp from '../../assets/img/arrow-up.svg'
import ArrowDown from '../../assets/img/arrow-down.svg'
import EditableField from '../EditableField'
import { isManagerOf } from './utils'
import './index.scss'

const EmployeeSummary = (props) => {
    const {
        employees,
        src,
        email,
        firstName,
        lastName,
        onClickEmployeeSummary,
        streetAddress,
        isBig,
        city,
        setEditedValues,
        editedValues,
        isEditing,
        isCollapsible,
        subEmployees,
        currentIndex = 0,
        selectedEmployee = {},
        id,
        isMinified,
    } = props

    const [isCollapsed, setIsCollapsed] = useState(() => !isManagerOf(id, selectedEmployee?.id, employees))

    useEffect(() => {
        setIsCollapsed(!isManagerOf(id, selectedEmployee?.id, employees))
    }, [id, employees])

    const toggleCollapse = useCallback(
        e => {
            e.stopPropagation()
            setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed)
        },
        [setIsCollapsed]
    )

    const handleEmployeeSummaryClick = useCallback(
        (e) => {
            e.stopPropagation()
            onClickEmployeeSummary?.(id)
        },
        [onClickEmployeeSummary, id]
    )

    return (
        <div className='employee-summary-wrapper' style={{ marginLeft: currentIndex * 48 }}>
            <div
                className={classNames('employee-summary', {
                    selected: selectedEmployee?.id === id,
                    big: isBig,
                })}
                onClick={handleEmployeeSummaryClick}
            >
                <div
                    className={classNames('collapse-arrow', {
                        collapsed: isCollapsed,
                    })}
                    onClick={toggleCollapse}
                >
                    {isCollapsible && (isCollapsed ? <img src={ArrowDown} width={16} height={16} /> : <img src={ArrowUp} width={16} height={16} />)}
                </div>
                <Avatar size={isBig ? AvatarSizes.BIG : AvatarSizes.SMALL} src={src} />
                <div
                    className={classNames('employee-summary-details', {
                        big: isBig,
                    })}
                >
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
                            onInputChange={(newEmail) => setEditedValues?.({ ...(editedValues || {}), email: newEmail })}
                            placeholder='email'
                        >
                            {email}
                        </EditableField>
                    </div>
                    {!isMinified && streetAddress && (
                        <div className='employee-summary-address'>
                            <EditableField
                                value={editedValues?.streetAddress || streetAddress}
                                isEditing={isEditing}
                                onInputChange={(newStreetAddress) =>
                                    setEditedValues?.({
                                        ...(editedValues || {}),
                                        streetAddress: newStreetAddress,
                                    })
                                }
                                placeholder='street'
                            >
                                {streetAddress},
                            </EditableField>
                            <div className='employee-summary-address-city'>
                                <EditableField
                                    placeholder='city'
                                    value={editedValues?.city || city}
                                    isEditing={isEditing}
                                    onInputChange={(newCity) => setEditedValues?.({ ...(editedValues || {}), city: newCity })}
                                >
                                    {city}
                                </EditableField>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isCollapsible && subEmployees && !isCollapsed && (
                <div className='sub-employees'>
                    {subEmployees.map((subEmployee) => (
                        <EmployeeSummary
                            {...props}
                            {...subEmployee}
                            currentIndex={currentIndex + 1}
                            key={subEmployee.id}
                            isCollapsible={!!subEmployee.subEmployees?.length}
                            index={currentIndex}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default React.memo(EmployeeSummary)
