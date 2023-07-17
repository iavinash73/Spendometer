import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import savingService from './savingService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  savings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  totalSaving: 0
}

// Create new saving
export const createSaving = createAsyncThunk(
  'savings/create',
  async (savingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await savingService.createSaving(savingData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user savings
export const getSavings = createAsyncThunk(
  'savings/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await savingService.getSavings(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user saving
export const deleteSaving = createAsyncThunk(
  'savings/delete',
  async (exD, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await savingService.deleteSaving(exD, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update user saving
export const updateSaving = createAsyncThunk(
  'savings/update',
  async (exD, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await savingService.updateSaving(exD, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


//add user savings
export const addSaving = createAsyncThunk(
  'savings/add',
  async (exD, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await savingService.addSaving(exD, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const savingSlice = createSlice({
  name: 'saving',
  initialState,
  reducers: {
    reset: (state) => initialState,

  },
  extraReducers: (builder) => {
    builder
      .addCase(createSaving.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSaving.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.savings.push(action.payload.saving)
        state.totalSaving = action.payload.total
      })
      .addCase(createSaving.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSavings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSavings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.savings = action.payload.savings
        state.totalSaving = action.payload.total
      })
      .addCase(getSavings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteSaving.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSaving.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.savings = state.savings.filter(
          (saving) => saving._id !== action.payload.id
        )
        state.totalSaving = action.payload.total
      })
      .addCase(deleteSaving.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateSaving.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSaving.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.savings = action.payload.savings
      })
      .addCase(updateSaving.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addSaving.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSaving.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.savings = action.payload.savings
        state.totalSaving = action.payload.total
      })
      .addCase(addSaving.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = savingSlice.actions
export default savingSlice.reducer
