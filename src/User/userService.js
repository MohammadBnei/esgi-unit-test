const userFactory = require('./userFactory');

const userService = (users = []) => {
    /**
     * 
     * @param {*} newUser 
     */
    const createUser = (newUser) => {
        const user = userFactory(newUser)

        const errors = user.isValid()
        if (errors.length) {
            throw errors.join('\n')
        }
        users.push(user)

        return user
    }

    /**
     * Retruns all the users
     */
    const getUsers = () => {
        return users
    }

    /**
     * 
     * @param {*} id 
     */
    const getUser = (id) => {
        console.log({ id });
        return users.find(({ id: _id }) => _id === id) || 'No user found'
    }
    /**
     * 
     * @param {Number} id 
     * @param {updatedUser} updatedUser 
     */
    const updateUser = (id, updatedUser) => {
        const index = users.findIndex(({ id: _id }) => _id === id)

        if (index === -1 || updatedUser.isValid().length)
            throw new Error('id not found')

        users.splice(index, 1, updatedUser)
        return users[index]
    }

    /**
     * 
     * @param {*} id 
     */
    const deleteUser = (id) => {
        const index = users.findIndex(({ id: _id }) => _id === id)

        users.splice(index, 1)
        return 'Ok'
    }

    return {
        createUser,
        getUsers,
        getUser,
        updateUser,
        deleteUser
    }
}

module.exports = userService
