import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchTodos } from "./store/todoSlice";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import Filters from "./components/Filters/Filters";
import TodoAllList from "./components/TodoAllList/TodoAllList";

function App() {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>('');
  const todos = useAppSelector(state => state.todos.list);

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);


  interface IFilteredListEntry {
    id: number,
    text: string,
    isCompleted: boolean,
    isFavorite: boolean,
  }

  let filteredList: IFilteredListEntry[] = [];

  if (filter === 'favorite') {
    filteredList = todos.filter(todos => todos.isFavorite ? todos : null)
  }
  if (filter === 'completed') {
    filteredList = todos.filter(todos => todos.isCompleted ? todos : null)
  }
  if (filter === 'inWork') {
    filteredList = todos.filter(todos => !todos.isCompleted ? todos : null)
  }

  console.log(filteredList);

  return (
    <div className="App">
      <aside>
        <Filters
          setFilter={setFilter}
        />
      </aside>
      <section>
        <h1>Your TodoList</h1>
        <TodoForm />
        {filter === 'all' ? <TodoAllList filteredList={todos} /> :
          <TodoList filteredList={filteredList} />}
      </section>
    </div>
  );
}

export default App;
