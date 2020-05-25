
const createTodo = ({
    name,
    content
}) => {
    const todo = {
        name: name || '',
        content: content || '',
        creationDate: (new Date()).getTime()
    }

    todo.id = (new Date()).getTime()

    Object.seal(todo)
    
    return todo
}

const createToDoList = () => {
    const todos = []

    todos.reloadTime = null

    todos.addTodo = function(item) {

        this.canAddItem(item)
        const todo = createTodo(item)

        this.push(todo)
        const now = new Date()
        this.reloadTime = now.setMinutes((now.getMinutes) + 30)

        return todo
    }

    todos.canAddItem = function(item) {
        const {name, content} = item
        if (this.length > 10)
            throw new Error('There is already 10 Todos')

        if (this.reloadTime && this.reloadTime < (new Date()))
            throw new Error('You have to wait 30 minutes before adding another element')

        
        if (!name || !content)
            throw new Error('You need to enter a name and a content')
            
        if (content.length > 1000)
            throw new Error('Your content is too long! Max 1000 characters')

        if (this.findIndex(({name: _name}) => _name === name) !== -1)
            throw new Error(`The name ${name} is already taken`)

    }

    todos.id = (new Date()).getTime()

    return todos
}


module.exports = createToDoList
