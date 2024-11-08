import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosNoAuthInstance } from '../../api/axiosConfig';
import { setToken } from '../token/tokenSlicer';

export const AuthThunk = createAsyncThunk(
  'auth/authorizationThunk',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axiosNoAuthInstance.post(
        'auth/authorization',
        formData,
        config
      );
      console.log(response.data);
      dispatch(setToken(response.data));
      return response.data;
    } catch (error) {
      const message = error.message || 'Falied to fetch';
      return rejectWithValue(message);
    }
  }
);

const authSlicer = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AuthThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(AuthThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(AuthThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlicer.reducer;
