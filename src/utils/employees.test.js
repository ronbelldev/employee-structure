import {
    normalizeEmployees,
    createHierarchy,
    onEditField,
    findEmployeeByKey,
} from './employees'

describe('normalizeEmployees', () => {
    it('normalizes employee data', () => {
        const inputEmployees = [
            {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                username: 'john_doe',
                profile_pic: 'profile.jpg',
                gender: 'male',
                street_address: '123 Main St',
                city: 'Cityville',
                manager_id: 2,
                bio: 'A bio',
            },
        ]

        const normalized = normalizeEmployees(inputEmployees)

        expect(normalized).toEqual([
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                username: 'john_doe',
                src: 'profile.jpg',
                gender: 'male',
                streetAddress: '123 Main St',
                city: 'Cityville',
                managerId: 2,
                bio: 'A bio',
            },
        ])
    })
})

describe('createHierarchy', () => {
    it('creates a hierarchy of employees', () => {
        const inputEmployees = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                managerId: 2,
            },
            {
                id: 2,
                firstName: 'Manager',
                lastName: 'Smith',
            },
        ]

        const hierarchy = createHierarchy(inputEmployees)

        expect(hierarchy).toEqual([
            {
                id: 2,
                firstName: 'Manager',
                lastName: 'Smith',
                subEmployees: [
                    {
                        id: 1,
                        firstName: 'John',
                        lastName: 'Doe',
                        managerId: 2,
                        subEmployees: [],
                    },
                ],
            },
        ])
    })
})

describe('onEditField', () => {
    it('edits a field in the employee data', () => {
        const inputEmployees = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
            },
        ]

        const setEmployeesMock = jest.fn()

        onEditField({
            employeeId: 1,
            field: 'firstName',
            newValue: 'UpdatedJohn',
            employees: inputEmployees,
            setEmployees: setEmployeesMock,
        })

        expect(setEmployeesMock).toHaveBeenCalledWith([
            {
                id: 1,
                firstName: 'UpdatedJohn',
                lastName: 'Doe',
            },
        ])
    })
})

describe('findEmployeeByKey', () => {
    it('finds an employee by key and target value', () => {
        const inputEmployees = [
            {
                id: 1,
                username: 'john_doe',
            },
            {
                id: 2,
                username: 'manager_smith',
                subEmployees: [
                    {
                        id: 3,
                        username: 'sub_employee',
                    },
                ],
            },
        ]

        const foundEmployee = findEmployeeByKey(inputEmployees, 'username', 'sub_employee')

        expect(foundEmployee).toEqual({
            id: 3,
            username: 'sub_employee',
        })
    })

    it('returns undefined if no employee is found', () => {
        const inputEmployees = [
            {
                id: 1,
                username: 'john_doe',
            },
            {
                id: 2,
                username: 'manager_smith',
            },
        ]

        const foundEmployee = findEmployeeByKey(inputEmployees, 'username', 'nonexistent_user')

        expect(foundEmployee).toBeUndefined()
    })
})
