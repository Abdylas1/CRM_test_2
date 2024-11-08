import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const editDetailsThunk = createAsyncThunk(
  'editDetails/editDetailsThunk',
  async ({ id, formData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.patch(
        `details/${id}/edit-details`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to edit details text';
      return rejectWithValue(message);
    }
  }
);

const editDetailsSlice = createSlice({
  name: 'editDetails',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editDetailsThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editDetailsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(editDetailsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default editDetailsSlice.reducer;
