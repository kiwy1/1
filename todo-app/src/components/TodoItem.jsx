export function TodoItem({ id, title, completed, onDelete }) {
  const itemClassName = `todo-item ${completed ? 'todo-item--done' : 'todo-item--pending'}`

  return (
    <li className={itemClassName}>
      <span className="todo-item__title">{title}</span>
      <div className="todo-item__actions">
        <span className="todo-item__status">{completed ? 'Виконано' : 'У процесі'}</span>
        <button className="todo-item__delete" type="button" onClick={() => onDelete(id)}>
          Видалити
        </button>
      </div>
    </li>
  )
}

