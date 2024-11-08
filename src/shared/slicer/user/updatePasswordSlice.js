import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const updatePasswordThunk = createAsyncThunk(
  'updatePassword/updatePasswordThunk',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      console.log(currentPassword, newPassword);
      const response = await axiosInstance.patch('user/update-password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to update password';
      return rejectWithValue(message);
    }
  }
);

const updatePasswordSlice = createSlice({
  name: 'updatePassword',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updatePasswordThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePasswordThunk.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(updatePasswordThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default updatePasswordSlice.reducer;
