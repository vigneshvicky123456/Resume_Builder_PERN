import { configureStore } from '@reduxjs/toolkit';
import  authReducer   from '../Features/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer ,
  },
})

export default store;