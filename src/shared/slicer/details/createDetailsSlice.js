import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const createDetailsThunk = createAsyncThunk(
  'createDetails/createDetailsThunk',
  async ({ id, newDetails }, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.post(
        `details/${id}/create-details`,
        newDetails,
        config
      );
      return response.data.message;
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch';
      return rejectWithValue(message);
    }
  }
);

const createDetailsSlice = createSlice({
  name: 'createDetails',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createDetailsThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createDetailsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(createDetailsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default createDetailsSlice.reducer;
