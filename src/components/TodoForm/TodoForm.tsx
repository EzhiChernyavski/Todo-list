import React, {useState} from "react";
import {useAppDispatch} from "../../hooks";
import {addNewTodo} from '../../store/todoSlice';
import style from './TodoForm.module.css'


const TodoForm: React.FC = () => {
  const [todoText, setTodoText] = useState('');
  const maxLetters = 160;
  const textLength = todoText.length;
  const dispatch = useAppDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setTodoText(text);
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (maxLetters > textLength && textLength > 0) {
      dispatch(addNewTodo({todoText}));
      setTodoText('');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={style.addTodoItem}
    >
      <div className={style.inputWrapper}>
        <input
          className={style.field}
          type='text'
          value={todoText}
          onChange={handleInput}
          placeholder='Task name'
        />
        <button className={style.addButton}>Add task</button>
      </div>
      {textLength > maxLetters &&
        <span style={{color: 'red'}}>Task text limit exceeded by {textLength - maxLetters} characters</span>}
    </form>
  )
}

export default TodoForm;