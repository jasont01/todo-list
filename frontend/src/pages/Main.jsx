import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
//import { getLists, reset } from '../features/lists/listSlice'

const Main = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  // const { lists, isLoading, isError, message } = useSelector(
  //   (state) => state.lists
  // )

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message)
  //   }

  if (!user) {
    navigate('/login')
  }

  //   dispatch(getLists())

  //   return () => {
  //     dispatch(reset())
  //   }
  // }, [user, navigate, isError, message, dispatch])

  // if (isLoading) {
  //   return <Spinner />
  // }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.firstName}</h1>
        <p>ToDo List</p>
      </section>

      <section className='content'>
        {/* {lists.length > 0 ? (
          <div className='lists'>
            {lists.map((goal) => (
              <ListEntry key={list._id} list={list} />
            ))}
          </div>
        ) : (
          <h3>You do not have any lists</h3>
        )} */}
      </section>
    </>
  )
}

export default Main
