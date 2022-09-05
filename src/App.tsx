import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchTodos } from "./store/todoSlice";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import Filters from "./components/Filters/Filters";
import TodoAllList from "./components/TodoAllList/TodoAllList";

interface IFilteredListEntry {
  id: number,
  text: string,
  isCompleted: boolean,
  isFavorite: boolean,
}


function App() {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>('all');
  const [filteredList, setFilteredList] = useState<IFilteredListEntry[]>([])
  const todos = useAppSelector(state => state.todos.list);
  // let filteredList: IFilteredListEntry[] = [];

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  useEffect(() => {
    if (filter === 'favorite') {
      setFilteredList(todos.filter(todos => todos.isFavorite ? todos : null))
    }
    if (filter === 'completed') {
      setFilteredList(todos.filter(todos => todos.isCompleted ? todos : null))
    }
    if (filter === 'inWork') {
      setFilteredList(todos.filter(todos => !todos.isCompleted ? todos : null))
    }
  }, [filter])




  return (
    <div className="App">
      <aside>
        <Filters
          setFilter={setFilter}
        />
      </aside>
      <section>
        <div className='formWrapper'>
          <h1>Your TodoList</h1>
          <TodoForm />
          {filter === 'all' ? <TodoAllList filteredList={todos} /> :
            <TodoList filteredList={filteredList} />}
        </div>
      </section>
    </div>
  );
}

export default App;
