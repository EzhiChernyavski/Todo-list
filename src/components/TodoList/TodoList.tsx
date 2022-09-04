import React from "react";
import TodoItem from '../TodoItem/TodoItem';
import style from './TodoList.module.css';


type todoListProps = {
  filteredList: todo[],
}

type todo = {
  id: number,
  text: string,
  isCompleted: boolean,
  isFavorite: boolean,
}


const TodoList: React.FC<todoListProps> = ({ filteredList }) => {
  return (
    <>
      <ul className={style.itemsWrapper}>
        {
          filteredList.map(todo => (
            todo.isFavorite ?
              <TodoItem
                key={todo.id}
                {...todo}
              /> : null
          ))
        }
      </ul>
      <ul className={style.itemsWrapper}>
        {
          filteredList.map(todo => (
            !todo.isFavorite ?
            <TodoItem
              key={todo.id}
              {...todo}
            /> : null
          ))
        }
      </ul>
    </>
  )
}

export default TodoList;