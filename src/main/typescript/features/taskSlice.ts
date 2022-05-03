import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../components/main-component";
import { RootState } from "../reducers";

const taskSlice = createSlice({
  name: "taskList",
  initialState: {
    taskList: [],
  },
  reducers: {
    readTask(state: any, action: any) {
      return {
        ...state,
        taskList: action.payload,
      };
    },
  },
});

export const taskList = (state: RootState) => state.task.taskList;

export const readTaskAsyc = () => async (dispatch: any) => {
  try {
    const response = await axios.get("http://localhost:8080/restlist");
    const result = response.data;
    const taskList = result.error
      ? result
      : result.map((item: Task) => {
          return {
            id: item.id,
            task: item.task,
            deadline: item.deadline,
            done: item.done,
          };
        });
    dispatch(readTask(taskList));
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return e.response.data;
    } else {
      throw e;
    }
  }
};

export const { readTask } = taskSlice.actions;
export default taskSlice.reducer;
