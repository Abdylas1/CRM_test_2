import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const fetchUserInfoThunk = createAsyncThunk(
  'user/fetchUserInfoThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('user/user-info');
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch user info';
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfoThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserInfoThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserInfoThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
