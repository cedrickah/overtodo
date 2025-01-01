import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk("signUp", async (d) => {
  try {
    const { data, error } = await client.auth.signUp(d);
    if (error) throw error;
    return data.user;
  } catch (error) {
    throw error;
  }
});

export const signIn = createAsyncThunk("signIn", async (d) => {
  try {
    const { data, error } = await client.auth.signInWithPassword(d);
    if (error) throw error;
    return data.user;
  } catch (error) {
    throw error;
  }
});

export const getUser = createAsyncThunk(
  "getUser",
  async (d, { rejectWithValue }) => {
    try {
      const options = {
        method: "GET",
      };
      const { data, error } = await client.rpc.invoke("users/id", options);
      if (error) throw error;
      return data.msg;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
