import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import itemService from './itemService'

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  showNewItemForm: false,
  message: '',
}

export const createItem = createAsyncThunk(
  'items/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await itemService.createItem(data, token)
    } catch (error) {
      const message = parseError(error)
      thunkAPI.rejectWithValue(message)
    }
  }
)

export const getItems = createAsyncThunk(
  'items/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await itemService.getItems(token)
    } catch (error) {
      const message = parseError(error)
      thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateItem = createAsyncThunk(
  'items/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await itemService.updateItem(data, token)
    } catch (error) {
      const message = parseError(error)
      thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteItem = createAsyncThunk(
  'items/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await itemService.deleteItem(id, token)
    } catch (error) {
      const message = parseError(error)
      thunkAPI.rejectWithValue(message)
    }
  }
)

const parseError = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  return message
}

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    reset: (state) => initialState,
    showNewItemForm: (state, action) => {
      state.showNewItemForm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItem.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        state.items.push(action.payload)
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.items = action.payload
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateItem.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const currentState = current(state)
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        state.items = currentState.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        )
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteItem.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        state.items = state.items.filter(
          (item) => item._id !== action.payload.id
        )
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, showNewItemForm } = itemSlice.actions
export default itemSlice.reducer
