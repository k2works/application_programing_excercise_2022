import { combineReducers } from "redux";
import counterReducer from "../features/counterSlice";
import todoReducer from "../features/todoSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
