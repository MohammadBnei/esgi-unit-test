/**
 * Returns a user with an isValid function
 * @param {name} name 
 * @param {surname} surname 
 * @param {email} email 
 * @param {age} age 
 */
const createUser = (newUser) => {
    if (!newUser)
        newUser = {}
    const user = {
        name: newUser.name,
        email: newUser.email,
        surname: newUser.surname,
        password: newUser.password,
        dateOfBirth: newUser.dateOfBirth,
    }

    user.isValid = function () {
        const errors = []

        !this.email && errors.push('There is no email ! You need to enter an email address')
        !this.name && errors.push('There is no name ! You need to enter a name')
        !this.surname && errors.push('There is no surname ! You need to enter a surname ')
        !this.password && errors.push('There is no password ! You need to enter a password')
        !this.dateOfBirth && errors.push('There is no age ! You need to enter an age')

        if (errors.length)
            return errors

        !(this.password.length >= 8 && this.password.length <= 40) && errors.push('You have the wrong number of elements on your password (between 8 and 40)')
        !validateEmail(this.email) && errors.push('The email is not in the correct format')
        let ageLimit = new Date()
        ageLimit.setFullYear(ageLimit.getFullYear() - 13)
        this.dateOfBirth >= ageLimit && errors.push('The user is too young ! Must be at least 14')

        return errors
    }

    user.todoList = null

    user.isOfAge = function() {
        let ageLimit = new Date()
        ageLimit.setFullyear(ageLimit.getFullYear() - 18)

        return this.dateOfBirth >= ageLimit
    }

    Object.freeze(user)

    return user

}

function validateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}

module.exports = createUser
