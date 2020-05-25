const createTodoList = require('./todoListFactory')

describe('TodoList factory test suite', () => {
    
    
    test('should return a todoList with properties', () => {
        const todos = createTodoList()

        expect(todos).toBeInstanceOf(Array)
        expect(todos.length).toBe(0)
        expect(todos.addTodo).toBeInstanceOf(Function)
        expect(todos.reloadTime).toBeNull()
    });

    test('should not let todo be added', () => {
        const todos = createTodoList()

        try {
            todos.addTodo(({
                name: 'Charles',
                content: undefined
            }))
            
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('You need to enter a name and a content')
        }
    });
    
    test('should throw an error when trying to add a second todo before 30 minutes', () => {
        const todos = createTodoList()

        try {
            todos.addTodo({
                name: 'Charles',
                content: '- 1 brownie'
            })
            todos.addTodo({
                name: 'Corenthin',
                content: '-0 brownies'
            })
            
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('You have to wait 30 minutes before adding another element')
        }
    });

    test('should throw an error when checking if an invalid item can be added', () => {
        const todos = createTodoList()

        try {
            todos.canAddItem({
                name: 'Charles',
                content: '- 1 brownie'
            })
            
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('You need to enter a name and a content')
        }
    });

    test('should throw an error when content exceeds 1000 characters', () => {
        const todos = createTodoList()

        try {
            todos.canAddItem({
                name: 'Charles',
                content: (() => (new Array(1001)).map(() => 'a'))()
            })
            
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('Your content is too long! Max 1000 characters')
        }
    });
})