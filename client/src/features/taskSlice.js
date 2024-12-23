import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  res: {},
};

export const getAllTasks = createAsyncThunk(
  "task/all-tasks",
  async (data, thunkAPI) => {
    try {
      return await taskService.getAllTasks(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createATask = createAsyncThunk(
  "task/create",
  async (data, thunkAPI) => {
    try {
      return await taskService.createATask(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTask = createAsyncThunk("task/get", async (data, thunkAPI) => {
  try {
    return await taskService.getTask(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateTask = createAsyncThunk(
  "task/update",
  async (data, thunkAPI) => {
    try {
      return await taskService.updateTask(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id, thunkAPI) => {
    try {
      return await taskService.deleteTask(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.tasks = action.payload.tasks;
      state.res = action.payload.res;
    });
    builder.addCase(getAllTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.tasks = null;
      state.message = action.error;
      state.res = null;
    });

    builder.addCase(createATask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createATask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.createdTask = action.payload?.createdTask;
      state.res = action.payload?.res;

      if (state.createdTask !== null && state.isSuccess && state.res?.success) {
        toast.success("Task Created Successfully");
      }
    });
    builder.addCase(createATask.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
      if (state.isError) {
        toast.error("Something Gone Wrong");
      }
    });

    builder.addCase(getTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.gotTask = action.payload.gotTask;
      state.res = action.payload.res;
    });
    builder.addCase(getTask.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
    });

    builder.addCase(updateTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.updatedTask = action.payload?.updatedTask;
      state.res = action.payload?.res;
      if (state.isSuccess) {
        toast.success("Task Updated Successfully");
      }
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
      if (state.isError) {
        toast.error("Something Gone Wrong");
      }
    });

    builder.addCase(deleteTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.deletedTask = action.payload.deletedTask;
      state.res = action.payload.res;
      if (state.isSuccess) {
        toast.success("Task Deleted Successfully");
      }
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
      if (state.isError) {
        toast.error("Something Gone Wrong");
      }
    });
  },
});

export const taskReducer = taskSlice.reducer;
