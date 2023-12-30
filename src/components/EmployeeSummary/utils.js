export const isManagerOf = (selectedEmployeeId, employeeId, employees = []) =>  {
    const currentEmployee = employees.find((employee) => employee?.id === selectedEmployeeId)

    if (!currentEmployee || !currentEmployee.subEmployees || currentEmployee.subEmployees?.length === 0) {
        return false
    }

    const isDirectReport = currentEmployee.subEmployees.some((employee) => employee?.id === employeeId)

    if (isDirectReport) {
        return true
    }

    return currentEmployee.subEmployees.some((employee) => isManagerOf(employee?.id, employeeId, employees))
}
