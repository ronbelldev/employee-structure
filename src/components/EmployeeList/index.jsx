import React from 'react'
import './index.scss'
import EmployeeSummary from '../EmployeeSummary'

const EmployeeList = ({ employees = [], selectedEmployee, onClickEmployeeSummary }) => {
    // --> In a real project I would add react-virtualized to handle List Virtualization and avoid performance issues
    return <div className='employee-list'>
        {employees.map(employee =>
             <EmployeeSummary
                key={employee.id}
                employees={employees}
                id={employee.id}
                isCollapsible={!!employee.subEmployees?.length}
                subEmployees={employee.subEmployees}
                onClickEmployeeSummary={onClickEmployeeSummary}
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
}
export default EmployeeList
