import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import listService from './listService'

const initialState = {
  lists: [],
  activeList: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  showNewListForm: false,
  message: '',
}

export const createList = createAsyncThunk(
  'lists/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.createList(data, token)
    } catch (error) {
      const message = parseError(error)
      thunkAPI.rejectWithValue(message)
    }
  }
)

export const getLists = createAsyncThunk(
  'lists/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.getLists(token)
    } catch (error) {
      const message = parseError(error)
      thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateList = createAsyncThunk(
  'lists/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.updateList(data, token)
    } catch (error) {
      const message = parseError(error)
      thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteList = createAsyncThunk(
  'lists/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.deleteList(id, token)
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

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    reset: (state) => initialState,
    showNewListForm: (state, action) => {
      state.showNewListForm = action.payload
    },
    getActiveList: (state) => {
      const currentState = current(state)
      const active =
        currentState.lists.find((list) => list.active) || currentState.lists[0]
      if (active) {
        state.activeList = active._id
      }
    },
    setActiveList: (state, action) => {
      const id = action.payload
      state.lists = state.lists.map((list) =>
        list._id === id ? { ...list, active: true } : { ...list, active: false }
      )
      state.activeList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.lists.push(action.payload)
      })
      .addCase(createList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getLists.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.lists = action.payload
      })
      .addCase(getLists.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.lists = state.lists.map((list) =>
          list._id !== action.payload._id ? list : action.payload
        )
      })
      .addCase(updateList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.lists = state.lists.filter(
          (list) => list._id !== action.payload._id
        )
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, showNewListForm, getActiveList, setActiveList } =
  listSlice.actions
export default listSlice.reducer
