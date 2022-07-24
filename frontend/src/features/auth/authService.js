import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}`

const storeUserData = (persist, data) => {
  if (persist) {
    localStorage.setItem('user', JSON.stringify(data))
  } else {
    sessionStorage.setItem('user', JSON.stringify(data))
  }
}

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/user/register`, userData)
  if (res.data) return login(userData)
}

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/login`, userData)
  if (res.data) {
    storeUserData(res.data.remember, res.data)
  }
  return res.data
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('activeList')
  sessionStorage.removeItem('user')
}

const deleteAccount = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.delete(`${API_URL}/user/${userId}`, config)

  if (res.status === 204) {
    logout()
  }
  return res.data
}

const authService = {
  register,
  login,
  logout,
  deleteAccount,
}

export default authService
