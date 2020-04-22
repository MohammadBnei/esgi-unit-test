const todoListFactory = require('./todoListFactory')
const emailService = require('../Email/emailService')

const todoListService = {
    createTodoList(user) {     
        if (user.todoList !== null)
            throw new Error('User alreadey have a todo list')
        
        user.todoList = todoListFactory()
    },

    addItemToList(user, item) {
        if (user.todoList === null)
            throw new Error('The user must have a todoList')

        if (user.todoList.canAddItem(item)) {
            user.todoList.addTodo(item)  
            emailService.sendEmail(user)
        }
    }
}

module.exports = todoListService