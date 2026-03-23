import { TodoItem } from './TodoItem.jsx'

export function TodoList({ items, onDeleteTask, onEditTask }) {
  return (
    <ul className="todo-list">
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
        />
      ))}
    </ul>
  )
}

