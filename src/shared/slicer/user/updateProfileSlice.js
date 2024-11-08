import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const updateProfileThunk = createAsyncThunk(
  'profile/updateProfileThunk',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        'user/update-profile',
        userData
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to update profile';
      return rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateProfileThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
