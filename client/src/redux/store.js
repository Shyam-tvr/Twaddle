import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import alertReducer from './slices/alertSlice'
import postReducer from './slices/postSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    post: postReducer
  },
})