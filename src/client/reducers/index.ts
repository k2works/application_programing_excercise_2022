import { combineReducers } from "redux";
import counterReducer from "../features/counter/counterSlice";
import todoReducer from "../features/todo/todoSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
