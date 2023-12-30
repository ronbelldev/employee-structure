export const normalizeEmployees = employees => employees.map(employee => ({
    "id": employee.id,
    "firstName": employee.first_name,
    "lastName": employee.last_name,
    "email": employee.email,
    "username": employee.username,
    "src": employee.profile_pic,
    "gender": employee.gender,
    "streetAddress": employee.street_address,
    "city": employee.city,
    "managerId": employee.manager_id,
    "bio": employee.bio
}))

export const  onEditField = ({
    employeeId,
    field,
    newValue,
    employees = [],
    setEmployees
}) => {
    setEmployees(employees.map(employee => employee.id === employeeId
        ? ({ ...employee, [field]: newValue })
        : employee)
    )
}
