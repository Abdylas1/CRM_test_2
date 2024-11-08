import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const getDetailsThunk = createAsyncThunk(
  'details/getDetailsThunk',
  async (taskId, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get(
        `/details/${taskId}/get-details`,
        config
      );
      return response.data;
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch';
      return rejectWithValue(message);
    }
  }
);

const getDetailsSlice = createSlice({
  name: 'details',
  initialState: {
    items: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDetailsThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getDetailsThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getDetailsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default getDetailsSlice.reducer;
