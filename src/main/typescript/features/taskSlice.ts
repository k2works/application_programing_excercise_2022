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
    addTask(state: any, action: any) {
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };
    },
    deleteTask(state: any, action: any) {
      return {
        ...state,
        taskList: state.taskList.filter(
          (task: Task) => task.id !== action.payload
        ),
      };
    },
    updateTask(state: any, action: any) {
      return {
        ...state,
        taskList: state.taskList.map((task: Task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
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

export const addTaskAsync = (item: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/restadd?task=${item.task}&deadline=${item.deadline}`
    );
    dispatch(addTask(response.data));
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return e.response.data;
    } else {
      throw e;
    }
  }
};

export const deleteTaskAsync = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/restdelete?id=${id}`
    );
    dispatch(deleteTask(response.data));
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return e.response.data;
    } else {
      throw e;
    }
  }
};

export const updateTaskAsync = (item: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/restupdate?id=${item.id}&task=${item.task}&deadline=${item.deadline}&done=${item.done}`
    );
    dispatch(updateTask(response.data));
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return e.response.data;
    } else {
      throw e;
    }
  }
};

export const { readTask, addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
