import React from "react";
import TodoItem from '../TodoItem/TodoItem';
import style from './TodoAllList.module.css'


type todoListProps = {
  filteredList: todo[],
}

type todo = {
  id: number,
  text: string,
  isCompleted: boolean,
  isFavorite: boolean,
}


const TodoAllList: React.FC<todoListProps> = ({filteredList}) => {
  console.log(filteredList);
  return (
    <>
      <ul className={style.itemsWrapper}>
        {
          filteredList.map(todo => (
            todo.isFavorite && !todo.isCompleted ?
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
            !todo.isFavorite && !todo.isCompleted ?
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
            todo.isCompleted ?
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

export default TodoAllList;