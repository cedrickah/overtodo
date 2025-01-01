import { createSlice } from "@reduxjs/toolkit";
import { getTodos } from "./action";
import { Todo } from "../../../types";

interface State {
  todos: Todo[] | null;
}

const initialState: State = {
  todos: null,
};

const adSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.todos = null;
    });
  },
});

export default adSlice.reducer;
