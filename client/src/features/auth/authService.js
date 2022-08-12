import axios from 'axios'

const authAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
})

const userAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/user`,
})

const storeUserData = (persist, data) => {
  if (persist) {
    localStorage.setItem('user', JSON.stringify(data))
  } else {
    sessionStorage.setItem('user', JSON.stringify(data))
  }
}

const register = async (userData) => {
  const res = await userAPI.post('/register', userData)
  if (res.data) return login(userData)
}

const login = async (userData) => {
  const res = await authAPI.post('/login', userData)
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

  const res = await userAPI.delete(`/${userId}`, config)

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
