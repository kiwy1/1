import { useState } from 'react'
import { TodoList } from './components/TodoList.jsx'

const TODOS = [
  { id: 1, title: 'Прочитати умову завдання', completed: true },
  { id: 2, title: 'Створити Vite + React проєкт', completed: true },
  { id: 3, title: 'Винести список задач у константу', completed: true },
  { id: 4, title: 'Передати задачі в компонент через props', completed: true },
  { id: 5, title: 'Оформити базове стилізування', completed: false },
]

function App() {
  const [todos, setTodos] = useState(TODOS)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleAddTask(event) {
    event.preventDefault()

    const trimmedTitle = newTaskTitle.trim()
    if (!trimmedTitle) {
      return
    }

    const newTodo = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    }

    setTodos((currentTodos) => [...currentTodos, newTodo])
    setNewTaskTitle('')
  }

  function handleDeleteTask(taskId) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== taskId))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Todo List</h1>
        <p className="app-subtitle">Простий список задач на React + Vite</p>
      </header>
      <main>
        <form className="todo-form" onSubmit={handleAddTask}>
          <input
            className="todo-input"
            type="text"
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.target.value)}
            placeholder="Введіть нову задачу"
          />
          <button className="todo-add-button" type="submit">
            Додати
          </button>
        </form>

        <TodoList items={todos} onDeleteTask={handleDeleteTask} />
      </main>
    </div>
  )
}

export default App

