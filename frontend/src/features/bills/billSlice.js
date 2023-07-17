import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import billService from './billService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  bills: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  totalBill:0
}

// Create new bill
export const createBill = createAsyncThunk(
  'bills/create',
  async (billData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await billService.createBill(billData, token)
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

// Get user bills
export const getBills = createAsyncThunk(
  'bills/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await billService.getBills(token)
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

// Delete user bill
export const deleteBill = createAsyncThunk(
  'bills/delete',
  async (exD, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await billService.deleteBill(exD, token)
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

//update user expence
export const updateBill = createAsyncThunk(
  'bills/update',
  async (exD, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await billService.updateBill(exD, token)
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


export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    reset: (state) => initialState,

  },
  extraReducers: (builder) => {
    builder
      .addCase(createBill.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bills.push(action.payload.bill)
        state.totalBill = action.payload.total
      })
      .addCase(createBill.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBills.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBills.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bills = action.payload.bills
        state.totalBill = action.payload.total.total_bill
      })
      .addCase(getBills.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteBill.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bills = state.bills.filter(
          (bill) => bill._id !== action.payload.id
        )
        state.totalBill = action.payload.total
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateBill.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBill.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bills = action.payload.bills
        state.totalBill = action.payload.total
      })
      .addCase(updateBill.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = billSlice.actions
export default billSlice.reducer