import React from 'react';
import style from './Menu.module.css'
import { deleteTodo, toggleFavorite, toggleStatus } from "../../store/todoSlice";
import { useAppDispatch } from "../../hooks";

interface MenuProps {
  handleEdit: () => void,
  id: number,
  isFavorite: boolean,
  isCompleted: boolean,

}

const Menu: React.FC<MenuProps> = ({ handleEdit, id, isFavorite, isCompleted }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={style.menu}>
      <button
        className={style.button}
        onClick={() => dispatch(toggleStatus({ id, isCompleted }))}
      >{isCompleted ? 'Uncompleted' : `Completed`}
      </button>
      <button
        className={isFavorite ? style.activeButton : style.button}
        onClick={() => dispatch(toggleFavorite({ id, isFavorite }))}
      >Favorite
      </button>

      <button
        className={style.button}
        onClick={handleEdit}
      >Edit
      </button>
      <button
        className={style.button}
        onClick={() => dispatch(deleteTodo(id))}
      >Delete
      </button>
    </div>
  );
};

export default Menu;