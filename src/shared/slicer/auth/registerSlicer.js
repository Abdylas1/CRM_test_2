import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosNoAuthInstance } from '../../api/axiosConfig';
import { setToken } from '../token/tokenSlicer';
export const registerThunk = createAsyncThunk(
  'register/registerThunk',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axiosNoAuthInstance.post(
        'auth/register',
        formData,
        config
      );
      if (response.data.token) {
        dispatch(setToken(response.data.token));
      }
      return response.data.message;
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message || error.message || 'Falied to fetch';
      return rejectWithValue(message);
    }
  }
);

const registerSlicer = createSlice({
  name: 'register',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default registerSlicer.reducer;
