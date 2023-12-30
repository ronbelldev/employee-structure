import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Avatar, { AvatarSizes } from '../Avatar'
import EmployeeName from '../EmployeeName'
import ArrowUp from '../../assets/img/arrow-up.svg'
import ArrowDown from '../../assets/img/arrow-down.svg'
import EditableField from '../EditableField'
import './index.scss'

// Collapsed state is minified
const getIsSummaryCollapsed = (employees, selectedEmployee, employeeId) => {
    for (let employee of employees) {
        if (employee.id === employeeId && employee.subEmployees.some(employee => employee.id === selectedEmployee.id)) {
        return false
    }
        return getIsSummaryCollapsed(employee.subEmployees, selectedEmployee, employeeId)
    }
}

function isManagerOf(managerId, employeeId, employees = []) {
    const manager = employees.find((employee) => employee?.id === managerId)

    if (!manager || !manager.subEmployees || manager.subEmployees?.length === 0) {
        return false
    }

    // Check if the employee with employeeId is a direct report of the manager
    const isDirectReport = manager.subEmployees.some((employee) => employee?.id === employeeId)

    if (isDirectReport) {
        return true
    }

    // Recursively check each child's descendants
    return manager.subEmployees.some((employee) => isManagerOf(employee?.id, employeeId, employees))
}
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
        isMinified
    } = props

    const [isCollapsed, setIsCollapsed] = useState(!isManagerOf(id, selectedEmployee?.id, employees))

    useEffect(() => {
        setIsCollapsed(!isManagerOf(id, selectedEmployee?.id, employees))
    }, [selectedEmployee])

    const toggleCollapse = e => {
        e.stopPropagation()
        setIsCollapsed(!isCollapsed)
    }

    return (
        <div className='employee-summary-wrapper' style={{ marginLeft: currentIndex * 48 }}>

        <div
            className={classNames('employee-summary', {
                selected: selectedEmployee?.id === id   ,
                big: isBig,
            })}
            onClick={e => {
                e.stopPropagation()
                onClickEmployeeSummary?.(id)
            }}
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
                        onInputChange={(email) =>
                            setEditedValues?.({ ...(editedValues || {}), email })
                        }
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
                            onInputChange={(streetAddress) =>
                                setEditedValues?.({
                                    ...(editedValues || {}),
                                    streetAddress,
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
                                onInputChange={(city) =>
                                    setEditedValues?.({ ...(editedValues || {}), city })
                                }
                            >
                                {city}
                            </EditableField>
                        </div>
                    </div>
                )}
            </div>
        </div>
            {isCollapsible && subEmployees && !isCollapsed &&  (
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

export default EmployeeSummary

