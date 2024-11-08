import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const editTaskThunk = createAsyncThunk(
  'editTask/editTaskThunk',
  async ({ id, formData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.patch(
        `tasks/edit-task/${id}`,
        formData,
        config
      );
      return response.data.editTask;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to edit task title';
      return rejectWithValue(message);
    }
  }
);

const editTaskSlice = createSlice({
  name: 'editTask',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editTaskThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editTaskThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(editTaskThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default editTaskSlice.reducer;
