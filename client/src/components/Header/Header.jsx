import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset, deleteAccount } from '../../features/auth/authSlice'
import { confirmAlert } from 'react-confirm-alert'
//import Menu from '../Menu/Menu'
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

  const handleDeleteAccount = () => {
    confirmAlert({
      title: `Delete Account`,
      message:
        'This will delete your account and all data associated with it. This is irreversible.  Are you sure?',
      buttons: [
        {
          label: 'Delete',
          className: styles.confirmBtn,
          onClick: () => dispatch(deleteAccount(user._id)),
        },
        {
          label: 'Cancel',
          className: styles.cancelBtn,
        },
      ],
    })
  }

  return (
    <header className={styles.content}>
      {/* <Menu
        user={user}
        logout={handleLogout}
        deleteAccount={handleDeleteAccount}
      /> */}
    </header>
  )
}

export default Header
