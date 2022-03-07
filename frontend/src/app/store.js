import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import listReducer from '../features/lists/listSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
  },
})
