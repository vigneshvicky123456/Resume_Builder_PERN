import { configureStore } from '@reduxjs/toolkit';
import  authReducer   from '../Features/userSlice';
import resumeReducer from '../Features/resumeSlice';
import contactReducer from '../Features/contactSlice';
import experienceReducer from '../Features/experienceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    contact: contactReducer,
    experience: experienceReducer
  },
})

export default store;