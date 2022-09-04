import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

type Todo = {
  id: number,
  text: string,
  isFavorite: boolean,
  isCompleted: boolean,
}

type TodosState = {
  list: Todo[],
  loading: boolean,
  error: string | null
}

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  'todos/fetchTodos',
  async function (_, {rejectWithValue}) {
    const response = await fetch('https://630f97bf498924524a91c318.mockapi.io/todos')

    if (!response.ok) {
      return rejectWithValue('Error on a server!');
    }

    return await response.json();
  }
)

export const addNewTodo = createAsyncThunk<Todo, { todoText: string, id: number  }, { rejectValue: string }>(
  'todos/addNewTodo',
  async function ({todoText, id}, {rejectWithValue}) {
    const todo = {
      text: todoText,
      id: id,
      isCompleted: false,
      isFavorite: false,
    }

    const response = await fetch('https://630f97bf498924524a91c318.mockapi.io/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    if (!response.ok) {
      return rejectWithValue('Something went wrong. Can\'t add todo');
    }

    return (await response.json()) as Todo;
  }
)

export const submitChangeText = createAsyncThunk<Todo, { id: number, todoText: string }, { rejectValue: string }>(
  'todos/submitChangeText',
  async function ({id, todoText}, {rejectWithValue}) {

    const response = await fetch(`https://630f97bf498924524a91c318.mockapi.io/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: todoText,
      }),
    });

    if (!response.ok) {
      return rejectWithValue('Something went wrong. Can\'t change todo');
    }

    return (await response.json()) as Todo;
  }
)

export const toggleStatus = createAsyncThunk<Todo, { id: number, isCompleted: boolean }, { rejectValue: string }>(
  'todos/toggleStatus',
  async function ({id, isCompleted}, {rejectWithValue}) {

    const response = await fetch(`https://630f97bf498924524a91c318.mockapi.io/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isCompleted: !isCompleted,
      }),
    });

    if (!response.ok) {
      return rejectWithValue('Something went wrong. Can\'t change todo');
    }

    return (await response.json()) as Todo;
  }
)

export const toggleFavorite = createAsyncThunk<Todo, { id: number, isFavorite: boolean }, { rejectValue: string }>(
  'todos/toggleFavorite',
  async function ({id, isFavorite}, {rejectWithValue}) {

    const response = await fetch(`https://630f97bf498924524a91c318.mockapi.io/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isFavorite: !isFavorite,
      }),
    });

    if (!response.ok) {
      return rejectWithValue('Something went wrong. Can\'t change todo');
    }

    return (await response.json()) as Todo;
  }
)

export const deleteTodo = createAsyncThunk<number, number, { rejectValue: string }>(
  'todos/deleteTodo',
  async function (id, {rejectWithValue}) {
    const response = await fetch(`https://630f97bf498924524a91c318.mockapi.io/todos/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return rejectWithValue('Can\'t delete this todo')
    }

    return id;
  }
)

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(submitChangeText.fulfilled, (state, action) => {
        const todo = state.list.find(todo => todo.id === action.payload.id);
        if (todo) {
          if (todo.text !== action.payload.text) {
            todo.text = action.payload.text
          }
        }
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const todo = state.list.find(todo => todo.id === action.payload.id);
        if (todo) {
          todo.isCompleted = !todo.isCompleted;
        }
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const todo = state.list.find(todo => todo.id === action.payload.id);
        if (todo) {
          todo.isFavorite = !todo.isFavorite;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter(todo => todo.id !== action.payload)
      })
  }
})

export default todoSlice.reducer;