import React from 'react'
import './index.scss'
import EmployeeSummary from '../EmployeeSummary'

const EmployeeList = ({ employees = [], selectedEmployee, onClickEmployeeSummary }) =>
    <div className='employee-list'>
        {employees.map(employee =>
            <EmployeeSummary
                employees={employees}
                id={employee.id}
                isCollapsible={!!employee.subEmployees?.length}
                subEmployees={employee.subEmployees}
                onClickEmployeeSummary={onClickEmployeeSummary}
                key={employee.id}
                email={employee.email}
                firstName={employee.firstName}
                lastName={employee.lastName}
                src={employee.src}
                subEmployee={employee.subEmployee}
                selectedEmployee={selectedEmployee}
                isMinified
            />

        )}
    </div>

export default EmployeeList
