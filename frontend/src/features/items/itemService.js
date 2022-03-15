import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}/items`

const createItem = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, data, config)
  return response.data
}

const getItems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

const updateItem = async (data, token) => {
  const id = data._id
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/${id}`, data, config)

  return response.data
}

const deleteItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${id}`, config)

  return response.data
}

const itemService = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
}

export default itemService
