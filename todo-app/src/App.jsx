import { useEffect, useState } from 'react'
import { TodoList } from './components/TodoList.jsx'

const API_URL = 'http://localhost:3001/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadTodos() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Не вдалося отримати список задач')
        }

        const data = await response.json()
        setTodos(data)
      } catch (error) {
        setErrorMessage(error.message)
      }
    }

    loadTodos()
  }, [])

  async function handleAddTask(event) {
    event.preventDefault()

    const trimmedTitle = newTaskTitle.trim()
    if (!trimmedTitle) {
      return
    }

    setErrorMessage('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmedTitle }),
      })

      if (!response.ok) {
        throw new Error('Не вдалося додати задачу')
      }

      const newTodo = await response.json()
      setTodos((currentTodos) => [...currentTodos, newTodo])
      setNewTaskTitle('')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  async function handleDeleteTask(taskId) {
    setErrorMessage('')

    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Не вдалося видалити задачу')
      }

      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== taskId))
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  async function handleEditTask(taskId, nextTitle) {
    const trimmedTitle = nextTitle.trim()
    if (!trimmedTitle) {
      return
    }

    setErrorMessage('')

    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmedTitle }),
      })

      if (!response.ok) {
        throw new Error('Не вдалося відредагувати задачу')
      }

      const updatedTodo = await response.json()
      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === taskId ? updatedTodo : todo)),
      )
    } catch (error) {
      setErrorMessage(error.message)
    }
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

        {errorMessage ? <p className="app-error">{errorMessage}</p> : null}

        <TodoList items={todos} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
      </main>
    </div>
  )
}

export default App

