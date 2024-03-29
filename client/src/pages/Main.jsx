import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'
import { getLists, reset } from '../features/lists/listSlice'
import { getItems } from '../features/items/itemSlice'
import Spinner from '../components/Spinner'
import Header from '../components/Header/Header'
import Content from '../components/Content/Content'
import Mobile from '../components/Mobile'

//const RATIO = 3620 / 2475

const Main = () => {
  const isDesktop = useMediaQuery('(min-width:900px)')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, message } = useSelector((state) => state.lists)

  useEffect(() => {
    if (isError) {
      console.error(message)
    }

    if (user) {
      dispatch(getLists())
      dispatch(getItems())
    } else {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, navigate, dispatch])

  if (isLoading || !user) {
    return <Spinner />
  }

  return (
    <div className='main'>
      <Header />
      {isDesktop ? <Content /> : <Mobile content={<Content />} />}
    </div>
  )
}

export default Main
