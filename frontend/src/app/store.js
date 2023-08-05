import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import expenseReducer from '../features/expenses/expenseSlice'
import savingReducer from '../features/savings/savingSlice'
import billReducer from '../features/bills/billSlice'
import colabReducer from "../features/colabs/colabSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    savings: savingReducer,
    bills: billReducer,
    colabs:colabReducer,
  },
})
