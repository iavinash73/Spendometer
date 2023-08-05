import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import colabService from './colabService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  colabs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  total: 0
}

// Create new colab
export const createColab = createAsyncThunk(
  'colabs/create',
  async (colabData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await colabService.createColab(colabData, token)
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

// Get user colabs
export const getColabs = createAsyncThunk(
  'colabs/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await colabService.getColabs(token)
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

// Delete user colab
export const deleteColab = createAsyncThunk(
  'colabs/delete',
  async (CID, thunkAPI) => {
    try {
      // console.log(CID)
      const token = thunkAPI.getState().auth.user.token
      return await colabService.deleteColab(CID, token)
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

//update user colab
export const updateColab = createAsyncThunk(
  'colabs/update',
  async (CID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // console.log(CID)
      return await colabService.updateColab(CID, token)
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


//add user to colab
export const addUserColab = createAsyncThunk(
  'colabs/addUser',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(data)
      return await colabService.addUserColab(data, token)
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

//remove user from colab
export const removeUserColab = createAsyncThunk(
  'colabs/removeUser',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // console.log(data)
      return await colabService.removeUserColab(data, token)
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

//add user to colab
export const addExpense = createAsyncThunk(
  'colabs/addExpense',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // console.log(data)
      return await colabService.addExpense(data, token)
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
//update expense in colab
export const updateExpense = createAsyncThunk(
  'colabs/updateExpense',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // console.log(data)
      return await colabService.updateExpense(data, token)
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

//update expense in colab
export const deleteExpense = createAsyncThunk(
  'colabs/deleteExpense',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // console.log(data)
      return await colabService.deleteExpense(data, token)
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


export const colabSlice = createSlice({
  name: 'colab',
  initialState,
  reducers: {
    reset: (state) => initialState,

  },
  extraReducers: (builder) => {
    builder
      .addCase(createColab.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createColab.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.colabs.push(action.payload)
        state.total = action.payload.total
      })
      .addCase(createColab.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getColabs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getColabs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // console.log(action.payload)
        state.colabs = action.payload
        state.total = action.payload.total
      })
      .addCase(getColabs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteColab.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteColab.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.colabs = state.colabs.filter(
          (colab) => colab._id !== action.payload.id
        )
      })
      .addCase(deleteColab.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateColab.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateColab.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // console.log(action.payload)
        state.colabs = action.payload
      })
      .addCase(updateColab.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addUserColab.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addUserColab.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.colabs = action.payload
        // state.totalSaving = action.payload.total
      })
      .addCase(addUserColab.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeUserColab.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeUserColab.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.colabs = action.payload
        // state.totalSaving = action.payload.total
      })
      .addCase(removeUserColab.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.colabs = action.payload
        // state.totalSaving = action.payload.total
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.colabs = action.payload
        // state.totalSaving = action.payload.total
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.colabs = action.payload
        // state.totalSaving = action.payload.total
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = colabSlice.actions
export default colabSlice.reducer
