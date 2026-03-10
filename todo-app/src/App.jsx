import { TodoList } from './components/TodoList.jsx'

const TODOS = [
  { id: 1, title: 'Прочитати умову завдання', completed: true },
  { id: 2, title: 'Створити Vite + React проєкт', completed: true },
  { id: 3, title: 'Винести список задач у константу', completed: true },
  { id: 4, title: 'Передати задачі в компонент через props', completed: true },
  { id: 5, title: 'Оформити базове стилізування', completed: false },
]

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Todo List</h1>
        <p className="app-subtitle">Простий список задач на React + Vite</p>
      </header>
      <main>
        <TodoList items={TODOS} />
      </main>
    </div>
  )
}

export default App

