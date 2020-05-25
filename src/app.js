const express = require('express')
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = process.env.PORT || 3000

const users = []
const lists = []

const userService = require('./User').UserService(users, {})
const todoListService = require('./TodoList').TodoListService(lists, {})

app.get('/api/users', (req, res) => res.json(userService.getUsers()))
app.get('/api/users/:id', (req, res) => res.json(userService.getUser(req.params.id)))
app.post('/api/users', (req, res) => res.json(userService.createUser(req.body)))
app.post('/api/users/:id', (req, res) => res.json(userService.updateUser(req.body)))

app.listen(port, () => console.log(`Started listening on port : ${port}`))