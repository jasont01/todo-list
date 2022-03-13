import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { logout, reset } from '../../features/auth/authSlice'
import styles from './Header.module.css'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className={styles.content}>
      <div className={styles.user}>
        <h3>Welcome {user && user.firstName}</h3>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  )
}

export default Header
