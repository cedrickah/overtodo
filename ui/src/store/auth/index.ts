import { createSlice } from "@reduxjs/toolkit";
import { signIn, getUser } from "./action";
import { AppDispatch } from "..";
import { User } from "../../types";

interface State {
  isLoggedIn: boolean | null;
  user: User | null;
}

const initialState: State = {
  isLoggedIn: null,
  user: null,
};

export const initializeAuth = () => (dispatch: AppDispatch) => {
  dispatch(getUser());
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      if (action.payload === "Unauthorized token") {
        state.isLoggedIn = false;
        state.user = null;
      }
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export const { setIsLoggedIn, setUser } = authSlice.actions;
export default authSlice.reducer;
