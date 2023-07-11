import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchJsonPlaceholderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJsonPlaceholderListSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    addJsonPlaceholderTodoSuccess: (state, action) => {
      // @ts-ignore
      state.list.push(action.payload);
    },
    deleteJsonPlaceholderTodoSuccess: (state, action) => {
      state.list = state.list.filter((todo: any) => todo.id !== action.payload);
    },
    fetchJsonPlaceholderError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchJsonPlaceholderStart,
  fetchJsonPlaceholderListSuccess,
  addJsonPlaceholderTodoSuccess,
  deleteJsonPlaceholderTodoSuccess,
  fetchJsonPlaceholderError,
} = todoSlice.actions;

export default todoSlice.reducer;
