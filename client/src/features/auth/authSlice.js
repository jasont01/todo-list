import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(
  localStorage.getItem('user') || sessionStorage.getItem('user')
)

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      return await authService.register(data)
    } catch (error) {
      const message = parseError(error)
      thunkAPI.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    return await authService.login(data)
  } catch (error) {
    const message = parseError(error)
    thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken

      return await authService.deleteAccount(data, token)
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
