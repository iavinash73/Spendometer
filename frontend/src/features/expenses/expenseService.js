import axios from 'axios'

const API_URL = '/api/expenses/'

// Create new expense
const createExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, expenseData, config)

  return response.data
}

// Get user expenses
const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user expense
const deleteExpense = async (exD, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      cost: exD.cost,
    }
  }

  const response = await axios.delete(API_URL + exD.id, config)

  return response.data
}

//update user expense
const updateExpense = async (exD, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + exD.id, {
    desc: exD.desc,
    cost: exD.cost,
    tag: exD.tag,
    mode: exD.mode,
    date: exD.date
  },
    config)

  return response.data
}


const expenseService = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense
}

export default expenseService
