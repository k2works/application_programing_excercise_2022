import { combineReducers } from "redux";
import todoReducer from "../features/todo/todoSlice";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
