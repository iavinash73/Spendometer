import axios from 'axios'

const API_URL = '/api/bills/'

// Create new bill
const createBill = async (billData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, billData, config)

  return response.data
}

// Get user bills
const getBills = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user bill
const deleteBill = async (exD, token) => {
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

//update user bill
const updateBill = async (exD, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + exD.id, {
    title: exD.title,
    cost: exD.cost,
    duration: exD.duration,
    date: exD.date,
    status: exD.status
  },
    config)

  return response.data
}


const billService = {
  createBill,
  getBills,
  deleteBill,
  updateBill
}

export default billService
