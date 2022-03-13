import { useDispatch } from 'react-redux'
import { updateItem } from '../../../features/items/itemSlice'
import styles from './Checkbox.module.css'

const Checkbox = ({
  item,
  item: { _id: id, completed, description: label },
}) => {
  const dispatch = useDispatch()

  const toggleDone = () => {
    dispatch(updateItem({ ...item, completed: !completed }))
  }

  return (
    <div className={styles.title}>
      <input
        type='checkbox'
        id={id}
        onChange={toggleDone}
        checked={completed}
      />
      <label htmlFor={id} className={completed ? 'done' : undefined}>
        {label}
      </label>
    </div>
  )
}
export default Checkbox
