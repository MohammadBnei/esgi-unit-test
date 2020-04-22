const userFactory = require('./userFactory');

const userService = (users) => {
    const createUser = (newUser) => {
        const user = userFactory(newUser)

        user.id = (new Date()).now()
        users.push(user)
    }

    const getUser = (id) => {
        return users.find(({id: _id}) => _id === id)
    }

    const updateUser = (id, updatedUser) => {
        const index = users.findIndex(({id: _id}) => _id === id)

        users.splice(index, 1, updatedUser)
    }

    const deleteUser = (id) => {
        const index = users.findIndex(({id: _id}) => _id === id)

        users.splice(index, 1)
    }

    return {
        createUser,
        getUser,
        updateUser,
        deleteUser
    }
}

module.exports = userService
