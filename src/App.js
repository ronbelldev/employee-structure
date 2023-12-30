import { useEffect, useState } from 'react'
import { mockData } from './mockData'
import EmployeeDetails from './components/EmployeeDetails'
import { normalizeEmployees, onEditField } from './utils/employees'
import './App.scss'
import EmployeeList from './components/EmployeeList'

const normalizedEmployees = normalizeEmployees(mockData)
const findEmployeeByKey = (employees, key, targetValue) => employees.find(employee => employee[key] === targetValue)

const App = () => {
    // The duplicate employees/selectedEmployee state would be deleted by using Redux + real API with CRUD operations
    const [employees, setEmployees] = useState(normalizedEmployees)
    const [selectedEmployee, setSelectedEmployee] = useState()

    const onSave = (editedValues = {}) => {
        // The duplicate employees/selectedEmployee state would be deleted by using Redux + real API with CRUD operations
        let updatedSelectedEmployee = selectedEmployee
        let updatedEmployees = employees
        Object.entries(editedValues).forEach(([field, newValue]) => {
            updatedSelectedEmployee = { ...updatedSelectedEmployee, [field]: newValue}
            onEditField({
                employeeId: selectedEmployee.id,
                field,
                newValue,
                employees: updatedEmployees,
                setEmployees: employees => updatedEmployees = employees
            })
        })
        setSelectedEmployee(updatedSelectedEmployee)
        setEmployees(updatedEmployees)
    }

    const onDeleteEmployee = () => {
        setEmployees(employees.filter(employee => employee.id !== selectedEmployee.id))
        setSelectedEmployee(null)
    }


    useEffect(() => {
        setSelectedEmployee(findEmployeeByKey(employees, 'username', window.location.href.substring(window.location.href.lastIndexOf('/') + 1)))
    }, [window.location.href])

    const onClickEmployeeSummary = employeeId => () => {
        setSelectedEmployee(findEmployeeByKey(employees, 'id', employeeId))
        window.location.href = findEmployeeByKey(employees, 'id', employeeId).username
    }

    return (
    <div className="home">
        <div className='left-part'>
            <div className='employeees-title'>
                EMPLOYEES
            </div>
            <EmployeeList
                employees={employees}
                selectedEmployee={selectedEmployee}
                onClickEmployeeSummary={onClickEmployeeSummary}
            />
        </div>
        {selectedEmployee && (
            <div className='right-part'>
                <EmployeeDetails onDeleteEmployee={onDeleteEmployee} employee={selectedEmployee} onEditField={onEditField} onSave={onSave}/>
            </div>)}
    </div>
  );
}

export default App;
