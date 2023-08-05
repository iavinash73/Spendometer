import axios from 'axios'

const API_URL = '/api/colabs/'

// Create new saving
const createColab = async (colabData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // console.log(colabData)
  const response = await axios.post(API_URL+"create", colabData, config)
  // console.log(response.data)
  return response.data
}

// Get user savings
const getColabs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// Delete user saving
const deleteColab = async (CID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // console.log(CID)
  const response = await axios.delete(API_URL +"delete/"+ CID, config)
  return response.data
}

//update colab
const updateColab = async (CID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(CID)
  // console.log(API_URL +"rename/"+ CID.id)
  const response = await axios.put(API_URL +"rename/"+ CID.id, {
    title: CID.title,
    desc:CID.desc
  },
    config)

  return response.data
}

//add user to colab
const addUserColab = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // console.log(data)
  // console.log(API_URL + "addUser/" + data.id)
  const response = await axios.put(API_URL + "addUser/" + data.id, {
   user : data.user
  },
    config)

  return response.data
}

//remove user from colab
const removeUserColab = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // console.log(data)
  // console.log(API_URL + "removeUser/" + data.id)
  const response = await axios.put(API_URL + "removeUser/" + data.id, {
   email : data.email
  },
    config)

  return response.data
}

//add expense to colab under a user
const addExpense = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // console.log(data)
  // console.log(API_URL + "addExpense/" + data.id)
  const response = await axios.put(API_URL + "addExpense/" + data.id, data,
    config)

  return response.data
}

//update user expense in a colab
const updateExpense = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(data)
  // console.log(API_URL +"updateExpense/"+ data.CID)
  const response = await axios.put(API_URL +"updateExpense/"+ data.CID, {
    id:data.id,
    desc: data.desc,
    cost:data.cost,
    tag:data.tag,
    mode:data.mode,
    date:data.date
  },
    config)

  return response.data
}
//dekete user expense in a colab
const deleteExpense = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // console.log(data)
  const response = await axios.put(API_URL +"deleteExpense/"+ data.colabId, {
    expenseId:data.expenseId
  },
    config)

  return response.data
}


const ColabService = {
  createColab,
  getColabs,
  deleteColab,
  updateColab,
  addUserColab,
  removeUserColab,
  addExpense,
  updateExpense,
  deleteExpense
}

export default ColabService

