export function TodoItem({ title, completed }) {
  const itemClassName = `todo-item ${completed ? 'todo-item--done' : 'todo-item--pending'}`

  return (
    <li className={itemClassName}>
      <span className="todo-item__title">{title}</span>
      <span className="todo-item__status">{completed ? 'Виконано' : 'У процесі'}</span>
    </li>
  )
}

