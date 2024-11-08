import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const deleteNoteThunk = createAsyncThunk(
  'deleteNote/deleteNoteThunk',
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `notes/${noteId}/note-delete`
      );
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete note';
      return rejectWithValue(message);
    }
  }
);

const deleteNoteSlice = createSlice({
  name: 'deleteNote',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteNoteThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default deleteNoteSlice.reducer;
