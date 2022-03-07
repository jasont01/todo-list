import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getLists, reset } from '../features/lists/listSlice'
import Lists from '../components/lists/Lists'
//import Items from '../components/items/Items'

const Main = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { lists, isLoading, isError, message } = useSelector(
    (state) => state.lists
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (user) {
      dispatch(getLists())
    } else {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

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
      {/* <Items /> */}

      {/* <section className='content'>
        {lists.length > 0 ? (
          <div className='lists'>
            <ul>
              {lists.map((list) => (
                <li key={list._id}> {list.title} </li>
              ))}
            </ul>
          </div>
        ) : (
          <h3>You do not have any lists</h3>
        )}
      </section> */}
    </>
  )
}

export default Main
