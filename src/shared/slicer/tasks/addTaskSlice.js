import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';
export const addTaskThunk = createAsyncThunk(
  'addTask/addTaskThunk',
  async (newTask, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.post(
        'tasks/create-task',
        newTask,
        config
      );
      return response.data.message;
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message || error.message || 'Falied to fetch';
      return rejectWithValue(message);
    }
  }
);

const addTaskSlice = createSlice({
  name: 'addTask',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addTaskThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(addTaskThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default addTaskSlice.reducer;
