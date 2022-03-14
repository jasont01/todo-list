import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}/user`

const register = async (userData) => {
  const res = await axios.post(API_URL, userData)
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res.data
}

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData)
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res.data
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('activeList')
}

const authService = {
  register,
  login,
  logout,
}

export default authService
