export function TodoItem({ id, title, completed, onDelete, onEdit }) {
  const itemClassName = `todo-item ${completed ? 'todo-item--done' : 'todo-item--pending'}`

  function handleEdit() {
    const nextTitle = window.prompt('Нове формулювання задачі:', title)
    if (nextTitle === null) {
      return
    }

    onEdit(id, nextTitle)
  }

  return (
    <li className={itemClassName}>
      <span className="todo-item__title">{title}</span>
      <div className="todo-item__actions">
        <span className="todo-item__status">{completed ? 'Виконано' : 'У процесі'}</span>
        <button className="todo-item__edit" type="button" onClick={handleEdit}>
          Редагувати
        </button>
        <button className="todo-item__delete" type="button" onClick={() => onDelete(id)}>
          Видалити
        </button>
      </div>
    </li>
  )
}

