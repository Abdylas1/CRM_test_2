import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const getNoteThunk = createAsyncThunk(
  'notes/getNoteThunk',
  async ({ taskId, page, pageSize }, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get(
        `notes/${taskId}/get-notes`,
        {
          params: { page, pageSize },
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

const getNoteSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    pages: 1,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getNoteThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getNoteThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        state.items = action.payload.notes;
        state.pages = action.payload.pages;
      })
      .addCase(getNoteThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default getNoteSlice.reducer;
