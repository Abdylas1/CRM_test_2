import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const fetchTasksThunk = createAsyncThunk(
  'tasks/fetchTasksThunk',
  async (
    { page, pageSize, search = '', sortBy = 'createdAt', sortOrder = 'desc' },
    { rejectWithValue, getState }
  ) => {
    try {
      const token = getState().getToken.token;
      const config = {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get(
        'tasks/get-tasks',
        {
          params: { page, pageSize, search, sortBy, sortOrder },
        },
        config
      );
      return response.data;
    } catch (error) {
      const message = error.message || 'Failed to fetch';
      return rejectWithValue(message);
    }
  }
);

const getTasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    pages: 1,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasksThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.tasks;
        state.pages = action.payload.pages;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default getTasksSlice.reducer;
