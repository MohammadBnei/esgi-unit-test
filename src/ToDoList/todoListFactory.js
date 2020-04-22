
const createTodo = ({
    name,
    content
}) => {
    const todo = {
        name: name || '',
        content: content || '',
        creationDate: (new Date()).now()
    }

    Object.freeze(todo)
    
    return todo
}

const createToDoList = () => {
    const todos = []

    todos.reloadTime = false

    todos.addTodo = function({
        name,
        content
    }) {
        const todo = createTodo({name, content})

        this.push(todo)
        this.reloadTime = true
        setTimeout(() => {
            this.reloadTime = false
        }, 1.8 * Math.pow(10, 6)) // 30 minutes
    }

    todos.canAddItem = ({name, content}) => {
        if (this.length > 10)
            // throw new Error('There is already 10 Todos')
            return null

        if (this.reloadTime)
            // throw new Error('You have to wait 30 minutes before adding another element')
            return null

        
        if (!name || !content)
            // throw new Error('You need to enter a name and a content')
            return null

        

        if (this.findIndex(({name: _name}) => _name === name) !== -1)
            // throw new Error(`The name ${name} is already taken`)
            return null


        return {name, content}
    }

    Object.freeze(todos)

    return todos
}


module.exports = {
    todoListFactory: createToDoList,
};
