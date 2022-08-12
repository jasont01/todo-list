import axios from 'axios'

const itemsAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/items`,
})

const createItem = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await itemsAPI.post('/', data, config)
  return response.data
}

const getItems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await itemsAPI.get('/', config)

  return response.data
}

const updateItem = async (data, token) => {
  const id = data._id
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await itemsAPI.put(`/${id}`, data, config)

  return response.data
}

const deleteItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await itemsAPI.delete(`/${id}`, config)

  return response.data
}

const itemService = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
}

export default itemService
