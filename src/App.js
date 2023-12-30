import React, { useEffect, useMemo, useState } from 'react'
import { mockData } from './mockData'
import EmployeeDetails from './components/EmployeeDetails'
import { createHierarchy, normalizeEmployees, onEditField } from './utils/employees'
import './App.scss'
import EmployeeList from './components/EmployeeList'

const findEmployeeByKey = (employees, key, targetValue) => {
    let foundEmployee
    for (let employee of employees) {
        if (employee[key] === targetValue) {
            return employee
        }
        foundEmployee = findEmployeeByKey(employee.subEmployees, key, targetValue)
        if (foundEmployee) {
            break
        }
    }
    return foundEmployee
}

const App = () => {
    const normalizedEmployees = useMemo(() => createHierarchy(normalizeEmployees(mockData)), [])
    const [employees, setEmployees] = useState(normalizedEmployees)
    const [selectedEmployee, setSelectedEmployee] = useState()

    const findEmployeeMemoized = useMemo(
        () => findEmployeeByKey(employees, 'username', window.location.href.substring(window.location.href.lastIndexOf('/') + 1)),
        [employees]
    )

    useEffect(() => {
        if (findEmployeeMemoized) {
            setSelectedEmployee(findEmployeeMemoized)
        }
    }, [findEmployeeMemoized])

    const onSave = (editedValues = {}) => {
        let updatedSelectedEmployee = selectedEmployee
        let updatedEmployees = employees

        Object.entries(editedValues).forEach(([field, newValue]) => {
            updatedSelectedEmployee = { ...updatedSelectedEmployee, [field]: newValue }
            onEditField({
                employeeId: selectedEmployee.id,
                field,
                newValue,
                employees: updatedEmployees,
                setEmployees: (employees) => (updatedEmployees = employees),
            })
        })

        setSelectedEmployee(updatedSelectedEmployee)
        setEmployees(updatedEmployees)
    }

    const onDeleteEmployee = () => {
        const updatedEmployees = [...employees.filter((employee) => employee.id !== selectedEmployee.id), ...selectedEmployee.subEmployees]
        setEmployees(updatedEmployees)
        setSelectedEmployee(null)
    }

    const onClickEmployeeSummary = (employeeId) => {
        const selectedEmployee = findEmployeeByKey(employees, 'id', employeeId)
        setSelectedEmployee(selectedEmployee)
        window.history.pushState({}, null,  findEmployeeByKey(employees, 'id', employeeId).username)

    }

    return (
        <div className="home">
            <div className="left-part">
                <div className="employeees-title">EMPLOYEES</div>
                <EmployeeList employees={employees} selectedEmployee={selectedEmployee} onClickEmployeeSummary={onClickEmployeeSummary} />
            </div>
            {selectedEmployee && (
                <div className="right-part">
                    <EmployeeDetails onDeleteEmployee={onDeleteEmployee} employee={selectedEmployee} onEditField={onEditField} onSave={onSave} />
                </div>
            )}
        </div>
    )
}

export default App
