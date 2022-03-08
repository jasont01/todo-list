import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLists, reset } from '../features/lists/listSlice'
import Lists from '../components/lists/Lists'
import Spinner from '../components/Spinner'
//import Items from '../components/items/Items'

const Main = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, message } = useSelector((state) => state.lists)

  // const getActiveList = () => {
  //   let activeList = lists.find((list) => list.active)
  //   if (!activeList) {
  //     activeList = lists[0]
  //     dispatch(updateList(activeList.id, { active: true }))
  //   }
  //   return activeList
  // }

  useEffect(() => {
    if (isError) {
      console.error(message)
    }

    if (user) {
      dispatch(getLists())
    } else {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.firstName}</h1>
        <p>ToDo List</p>
      </section>

      <Lists />
      {/* <Items list={getActiveList()}/> */}
    </>
  )
}

export default Main
