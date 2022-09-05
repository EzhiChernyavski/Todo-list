import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch } from "../../hooks";
import { submitChangeText, toggleFavorite, toggleStatus } from "../../store/todoSlice";
import style from './TodoItem.module.css'
import Menu from "../Menu/Menu";
import menu from '../../icons/menu.png';
import star from '../../icons/star.png'

interface TodoItemProps {
  id: number,
  text: string,
  isFavorite: boolean,
  isCompleted: boolean,
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, isCompleted, isFavorite }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [todoText, setTodoText] = useState(text);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const menuLink = useRef<HTMLImageElement>(null)

  useEffect(() => {
    inputRef.current?.focus();
  }, [isFocus]);



  useEffect(() => {
    if (!isActiveMenu) return;

    const handleClickMenu = (event: any) => {
      if (!menuLink.current) return;
      if (!menuLink.current.contains(event.target)) {
        setIsActiveMenu(false)
      }
    }

    document.addEventListener('click', handleClickMenu);

    return () => {
      document.removeEventListener('click', handleClickMenu)
    }
  }, [isActiveMenu, setIsActiveMenu]);


  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setTodoText(text);
  }

  const submitChangedText = (event: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    event.preventDefault()
    setIsEdit(false);
    setIsFocus(false);

    dispatch(submitChangeText({ id, todoText }));
  }

  const handleEdit = () => {
    if (!isEdit) {
      setIsEdit(true);
      setIsFocus(true);
      inputRef.current?.focus();
    } else {
      setIsEdit(false)
    }
  }


  return (
    <li className={style.item}>
      {isFavorite && <img
        src={star}
        alt='favorite'
        className={style.favorite}
        onClick={() => dispatch(toggleFavorite({ id, isFavorite }))}
      />}
      <input
        className={style.check}
        type='checkbox'
        checked={isCompleted}
        onChange={() => dispatch(toggleStatus({ id, isCompleted }))}
      />
      {
        isEdit ? (
          <>
            <form
              className={style.editForm}
              onSubmit={submitChangedText}
            >
              <input
                className={style.editInput}
                type='text'
                value={todoText}
                ref={inputRef}
                onChange={handleChangeText}
              />
              <button className={style.confirmButton} type='submit'>Confirm</button>
            </form>
          </>
        ) : (
          <>
            <span onClick={handleEdit}>{text}</span>
          </>)
      }
      {isEdit || <img
        src={menu}
        alt='menu'
        className={style.imgMenu}
        ref={menuLink}
        onClick={() => setIsActiveMenu(!isActiveMenu)}
      />}
      {isActiveMenu && <Menu
        handleEdit={handleEdit}
        id={id}
        isCompleted={isCompleted}
        isFavorite={isFavorite}
      />}
    </li>
  )

}

export default TodoItem;