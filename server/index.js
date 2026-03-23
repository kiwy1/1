const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)
app.use(express.json())

let todos = [
  { id: 1, title: 'Прочитати умову завдання', completed: true },
  { id: 2, title: 'Створити Vite + React проєкт', completed: true },
  { id: 3, title: 'Винести список задач у константу', completed: true },
  { id: 4, title: 'Передати задачі в компонент через props', completed: true },
  { id: 5, title: 'Оформити базове стилізування', completed: false },
]

app.get('/api/todos', (req, res) => {
  res.json(todos)
})

app.post('/api/todos', (req, res) => {
  const title = req.body?.title?.trim()
  if (!title) {
    return res.status(400).json({ message: 'Task title is required' })
  }

  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
  }

  todos.push(newTodo)
  return res.status(201).json(newTodo)
})

app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id)
  const todoIndex = todos.findIndex((todo) => todo.id === id)

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Task not found' })
  }

  const updatedTitle = req.body?.title?.trim()
  if (!updatedTitle) {
    return res.status(400).json({ message: 'Task title is required' })
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    title: updatedTitle,
  }

  return res.json(todos[todoIndex])
})

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id)
  const exists = todos.some((todo) => todo.id === id)

  if (!exists) {
    return res.status(404).json({ message: 'Task not found' })
  }

  todos = todos.filter((todo) => todo.id !== id)
  return res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

