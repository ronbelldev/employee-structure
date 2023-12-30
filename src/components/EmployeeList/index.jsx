import React from 'react'
import './index.scss'
import EmployeeSummary from '../EmployeeSummary'

const EmployeeList = ({ employees, selectedEmployee, onClickEmployeeSummary }) =>
    <div className='employee-list'>
        {employees.map(employee =>
            <EmployeeSummary
                onClickEmployeeSummary={onClickEmployeeSummary(employee.id)}
                isSelected={selectedEmployee?.id === employee.id}
                key={employee.id}
                email={employee.email}
                firstName={employee.firstName}
                lastName={employee.lastName}
                src={employee.src}
            />

        )}
    </div>

export default EmployeeList
