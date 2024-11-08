import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const toggleTaskThunk = createAsyncThunk(
  'toggleTask/toggleTaskThunk',
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.patch(
        `tasks/toggle-status/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to edit task title';
      return rejectWithValue(message);
    }
  }
);

const toggleTaskSlice = createSlice({
  name: 'toggleTask',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(toggleTaskThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(toggleTaskThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(toggleTaskThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default toggleTaskSlice.reducer;
