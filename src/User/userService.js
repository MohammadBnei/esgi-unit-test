const userFactory = require('./userFactory');

const userService = () => {
    const users = []

    /**
     * 
     * @param {*} newUser 
     */
    const createUser = (newUser) => {
        const user = userFactory(newUser)
        users.push(user)

        return user
    }

    /**
     * 
     * @param {*} id 
     */
    const getUser = (id) => {
        return users.find(({id: _id}) => _id === id)
    }
    /**
     * 
     * @param {Number} id 
     * @param {updatedUser} updatedUser 
     */
    const updateUser = (id, updatedUser) => {
        const index = users.findIndex(({id: _id}) => _id === id)

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
        const index = users.findIndex(({id: _id}) => _id === id)
        
        users.splice(index, 1)
        return 'Ok'
    }

    return {
        users,
        createUser,
        getUser,
        updateUser,
        deleteUser
    }
}

module.exports = userService
