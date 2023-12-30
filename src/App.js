import React, { useEffect, useMemo, useState } from 'react'
import { mockData } from './mockData'
import EmployeeDetails from './components/EmployeeDetails'
import EmployeeList from './components/EmployeeList'
import { createHierarchy, findEmployeeByKey, normalizeEmployees, onEditField } from './utils/employees'
import './App.scss'

const removeEmployeeById = (employees, employeeId) =>
    employees.filter(employee => {
        if (employee.id === employeeId) {
            return false
        } else if (employee.subEmployees) {
            employee.subEmployees = removeEmployeeById(employee.subEmployees, employeeId)
        }
        return true
    })

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
    }, [])

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
        const updatedEmployees = removeEmployeeById(employees, selectedEmployee.id)
        setEmployees(updatedEmployees.concat(selectedEmployee.subEmployees))
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
                    <EmployeeDetails
                        selectedEmployee={selectedEmployee}
                        onDeleteEmployee={onDeleteEmployee}
                        employee={selectedEmployee}
                        onEditField={onEditField}
                        onSave={onSave}
                    />
                </div>
            )}
        </div>
    )
}

export default App
