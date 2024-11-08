import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosUserInstance } from '../../api/axiosConfig';

export const updateAvatarThunk = createAsyncThunk(
  'avatar/updateAvatarThunk',
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);
      const response = await axiosUserInstance.patch('user/upload-avatar', formData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to update avatar';
      return rejectWithValue(message);
    }
  }
);

const avatarSlice = createSlice({
  name: 'avatar',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateAvatarThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateAvatarThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateAvatarThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default avatarSlice.reducer;
