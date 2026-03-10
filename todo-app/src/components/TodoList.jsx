import { TodoItem } from './TodoItem.jsx'

export function TodoList({ items }) {
  return (
    <ul className="todo-list">
      {items.map((todo) => (
        <TodoItem key={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </ul>
  )
}

