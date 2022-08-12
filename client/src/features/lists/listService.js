import axios from 'axios'

const listsAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/lists`,
})

const createList = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await listsAPI.post('/', data, config)

  return response.data
}

const getLists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await listsAPI.get('/', config)

  return response.data
}

const updateList = async (data, token) => {
  const id = data._id
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await listsAPI.put(`/${id}`, data, config)

  return response.data
}

const deleteList = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await listsAPI.delete(`/${id}`, config)

  return response.data
}

const listService = {
  createList,
  getLists,
  updateList,
  deleteList,
}

export default listService
