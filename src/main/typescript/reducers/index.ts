import { combineReducers } from "redux";
import counterReducer from "../features/counterSlice";
import taskReducer from "../features/taskSlice";

const rootReducer = combineReducers({
  task: taskReducer,
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
