const UserService = require('./userService')

const { users, ...userService} = UserService()

const newUser = {
    name: 'Hill',
    surname: 'Bryan',
    email:'test@tes.com',
    dateOfBirth: ((new Date()).setFullYear(1965)),
    password: '123456789'
}

describe('User service test suite', () => {
    test('should create a user', () => {
        const user = userService.createUser(newUser)

        expect(user.id).toBeDefined()
        expect(userService.getUser(user.id)).toMatchObject(newUser)
        expect(user).toMatchObject(newUser)

    })

    test('should get a user through the service', () => {
        const user = userService.createUser(newUser)

        expect(user.id).toBeDefined()
        expect(userService.getUser(user.id)).toMatchObject(newUser)
    })

    test('should update a user', () => {
        let user = userService.createUser(newUser)

        const updatedUser = {
            ...user,
            name: 'monica'
        }

        user = userService.updateUser(user.id, updatedUser)

        expect(user.id).toBeDefined()
        expect(userService.getUser(user.id)).toMatchObject(updatedUser)
        expect(userService.getUser(user.id)).not.toMatchObject(newUser)
    })

    test('should delete a user', () => {
        let user = userService.createUser(newUser)

        const res = userService.deleteUser(user.id)

        expect(res).toBe('Ok')
        expect(userService.getUser(user.id)).toBeUndefined()
    })
})
