import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}/lists`

const createList = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, data, config)

  return response.data
}
const getLists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

const updateList = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/${id}`, data, config)

  return response.data
}

const deleteList = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${id}`, config)

  return response.data
}

const listService = {
  createList,
  getLists,
  updateList,
  deleteList,
}

export default listService
