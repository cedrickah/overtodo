import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../client";
import { API_URL } from "../../config/client";

export const createTodo = createAsyncThunk("createTodo", async (payload) => {
  try {
    const response = await fetch(`${API_URL}?user_id=some_user_id`);
    const data = await response.json();
    return data.msg;
  } catch (error) {
    throw error;
  }
});

export const getTodos = createAsyncThunk("getTodos", async (filter) => {
  try {
    const response = await fetch(`${API_URL}?user_id=some_user_id`);
    const data = await response.json();
    return data.msg;
  } catch (error) {
    throw error;
  }
});
