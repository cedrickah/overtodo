import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import todoReducer from "./todo";

const rootReducer = combineReducers({
  auth: authReducer,
  to: todoReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
