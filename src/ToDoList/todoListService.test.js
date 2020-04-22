const TodoListService = require('./todoListService');

const userFactoryMock = jest.fn((name = 'Charles') => ({
    name,
    isOfAge: () => true
}))

const user = userFactoryMock()

const todoListFactoryMock = jest.fn(() => {
    const list = []
    list.canAddItem = () => true
    list.addTodo = todo => {
        list.push(todo)
        todo.id = (new Date()).getTime()

        return todo
    }

    return list
})

const emailServiceMock = jest.fn(() => ({
    sendEmail(user) {}
}))

const todoListService = TodoListService({
    todoListFactory: todoListFactoryMock,
    emailService: emailServiceMock()
}) 

describe('TodoList service test suite', () => {
    test('should create a todo list for the user', () => {
        todoListService.createTodoList(user)

        const list = todoListService.getUserList(user)

        expect(list).toBeInstanceOf(Array)
    })

    test('should create a todo for the user', () => {
        const todo = todoListService.addItemToList(user, {
            name: 'name',
            content: 'content'
        })

        expect(todo).toMatchObject({
            name: 'name',
            content: 'content'
        })
        expect(todo).toHaveProperty('id')
    })

    test('should get item from user\'s list', () => {
        const todo = todoListService.addItemToList(user, {
            name: 'test',
            content: 'part 2'
        })

        const item = todoListService.getItemFromList(user, todo.id)

        expect(todo).toMatchObject(item)
    })
    
    

})
