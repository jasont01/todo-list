import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Router>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
        <ToastContainer />
      </StyledEngineProvider>
    </>
  )
}
export default App
