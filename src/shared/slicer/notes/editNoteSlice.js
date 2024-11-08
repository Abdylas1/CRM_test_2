import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const editNoteThunk = createAsyncThunk(
  'editNote/editNoteThunk',
  async ({ noteId, formData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.patch(
        `notes/${noteId}/note-edit`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to edit note text';
      return rejectWithValue(message);
    }
  }
);

const editNoteSlice = createSlice({
  name: 'editNote',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editNoteThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editNoteThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(editNoteThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default editNoteSlice.reducer;
