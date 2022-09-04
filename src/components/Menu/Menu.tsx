import React from 'react';
import style from './Menu.module.css'
import {deleteTodo, toggleFavorite} from "../../store/todoSlice";
import {useAppDispatch} from "../../hooks";

interface MenuProps {
  handleEdit: () => void,
  id: number,
  isFavorite: boolean,

}

const Menu: React.FC<MenuProps> = ({handleEdit, id, isFavorite}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={style.menu}>
      <button
        className={style.button}
        onClick={handleEdit}
      >Edit
      </button>
      <button
        className={isFavorite ? style.activeButton : style.button}
        onClick={() => dispatch(toggleFavorite({id, isFavorite}))}
      >Favorite
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