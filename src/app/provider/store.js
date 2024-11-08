import { configureStore } from '@reduxjs/toolkit';
import getTasksSlice from '../../shared/slicer/tasks/getTasksSlice';
import tokenSlicer from '../../shared/slicer/token/tokenSlicer';
import registerSlicer from '../../shared/slicer/auth/registerSlicer';
import authSlicer from '../../shared/slicer/auth/authSlicer';
import addTaskSlice from '../../shared/slicer/tasks/addTaskSlice';
import editTaskSlice from '../../shared/slicer/tasks/editTaskSlice';
import deleteTaskSlice from '../../shared/slicer/tasks/deleteTaskSlice';
import userSlice from '../../shared/slicer/user/getUserInfoSlice';
import updateAvatarSlice from '../../shared/slicer/user/updateAvatarSlice';
import updatePasswordSlice from '../../shared/slicer/user/updatePasswordSlice';
import getNoteSlice from '../../shared/slicer/notes/getNoteSlice';
import createNoteSlice from '../../shared/slicer/notes/createNoteSlice';
import getDetailsSlice from '../../shared/slicer/details/getDetailsSlice';

const store = configureStore({
  reducer: {
    tasks: getTasksSlice,
    notes: getNoteSlice,
    details: getDetailsSlice,
    getToken: tokenSlicer,
    register: registerSlicer,
    auth: authSlicer,
    addTask: addTaskSlice,
    addNote: createNoteSlice,
    editTask: editTaskSlice,
    deleteTask: deleteTaskSlice,
    user: userSlice,
    avatar: updateAvatarSlice,
    password: updatePasswordSlice,
  },
});
export default store;
