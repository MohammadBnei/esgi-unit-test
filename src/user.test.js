const createUser = require('./User/userFactory')

test('should return an user with undefined properties', () => {
    const {name, surname, email, dateOfBirth} = createUser()

    expect(name).toBe(undefined)
    expect(surname).toBe(undefined)
    expect(email).toBe(undefined)
    expect(dateOfBirth).toBe(undefined)
});

test('should return an user with isValid function', () => {
    const {isValid} = createUser()

    expect(isValid()).toBeInstanceOf('Array')
});