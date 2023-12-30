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

export const createHierarchy = employees => {
    const employeesMap = new Map()

    employees.forEach(employee => {
        employeesMap.set(employee.id, { ...employee, subEmployees: [] })
    })

    const root = []

    employees.forEach(employee => {
        const managerId = employee.managerId

        if (managerId
            // need this additional loop because in the data some root managers have managerId but that id does not refer to any data
            && employees.find(employee => employee.id === managerId)) {
            const manager = employeesMap.get(managerId)

            if (manager) {
                manager.subEmployees.push(employeesMap.get(employee.id))
            }
        } else {
            root.push(employeesMap.get(employee.id))
        }
    })

    return root
}



export const onEditField = ({
    employeeId,
    field,
    newValue,
    employees = [],
    setEmployees
}) => {
    setEmployees(employees.map(employee => employee.id === employeeId
        ? ({ ...employee, [field]: newValue })
        : {
            ...employee,
            subEmployees: employee.subEmployees.map(employee => employee.id === employeeId
                ? ({ ...employee, [field]: newValue })
                : employee
            )})
    )
}
