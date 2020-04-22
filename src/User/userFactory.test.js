const createUser = require('./userFactory')

describe('User factory test suite', () => {
    
    
    test('should return an user with undefined properties', () => {
        const {name, surname, email, dateOfBirth} = createUser()

        expect(name).toBe(undefined)
        expect(surname).toBe(undefined)
        expect(email).toBe(undefined)
        expect(dateOfBirth).toBe(undefined)
    });

    test('should return an user with isValid function', () => {
        const {isValid} = createUser({})
        
        expect(isValid()).toBeInstanceOf(Array)
        expect(isValid()).toHaveLength(5)
    });
    
    test('should return a valid user', () => {
        const user = createUser({
            name: 'Hill',
            surname: 'Bryan',
            email:'test@tes.com',
            dateOfBirth: ((new Date()).setFullYear(1965)),
            password: '123456789'
        })
        
        expect(user.isValid()).toBeInstanceOf(Array)
        expect(user.isValid()).toHaveLength(0)
    });
})