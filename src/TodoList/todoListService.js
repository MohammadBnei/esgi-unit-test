
/**
 * 
 * @param {*} lists 
 * @param {*} Services 
 */
const todoListService = (lists = [], {
    todoListFactory = require('./todoListFactory'),
    emailService = require('../Email').emailService
}) => {
    function createTodoList(user) {
        if (getUserList(user))
            throw new Error('User alreadey have a todo list')

        const list = todoListFactory()

        list.userId = user.id
        lists.push(list)
    }

    function getUserList(user) {
        return lists.find(({ userId }) => userId === user.id)
    }

    function addItemToList(user, item) {
        const list = getUserList(user)
        if (!list)
            throw new Error('The user must have a todoList')

        list.canAddItem(item)
        const todo = list.addTodo(item)
        emailService.sendEmail(user)

        return todo
    }

    function getItemFromList(user, id) {
        const list = getUserList(user)
        if (!list)
            throw new Error('The user must have a todoList')

        return list.find(({ id: _id }) => id === _id)

    }

    return {
        lists,
        createTodoList,
        getUserList,
        addItemToList,
        getItemFromList,
    }
}

module.exports = todoListService