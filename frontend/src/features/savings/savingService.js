import axios from 'axios'

const API_URL = '/api/savings/'

// Create new saving
const createSaving = async (savingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, savingData, config)
console.log(response.data)
  return response.data
}

// Get user savings
const getSavings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user saving
const deleteSaving = async (exD, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      savedAmount: exD.savedAmount,
    }
  }

  const response = await axios.delete(API_URL + exD.id, config)

  return response.data
}

//update user saving
const updateSaving = async (exD, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + exD.id, {
    title: exD.title,
    target: exD.target,
    deadline: exD.deadline
  },
    config)

  return response.data
}

//add to user saving
const addSaving = async (exD, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + "add/" + exD.id, {
   sav : exD.sav
  },
    config)

  return response.data
}





const savingService = {
  createSaving,
  getSavings,
  deleteSaving,
  updateSaving,
  addSaving,
}

export default savingService

