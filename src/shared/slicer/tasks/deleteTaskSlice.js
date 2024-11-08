import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const deleteTaskThunk = createAsyncThunk(
  'deleteTask/deleteTaskThunk',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`tasks/delete-task/${taskId}`);
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete task';
      return rejectWithValue(message);
    }
  }
);

const deleteTaskSlice = createSlice({
  name: 'deleteTask',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteTaskThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default deleteTaskSlice.reducer;
