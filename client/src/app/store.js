import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import listReducer from '../features/lists/listSlice'
import itemReducer from '../features/items/itemSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    items: itemReducer,
  },
})
