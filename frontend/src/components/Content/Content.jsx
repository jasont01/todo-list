import { useState, useEffect, useRef, useCallback } from 'react'
import Lists from '../Lists/Lists'
import Items from '../Items/Items'
import styles from './Content.module.css'

const Content = () => {
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  const updateHeight = useCallback(() => {
    if (ref && ref.current) {
      setHeight(ref.current.clientHeight)
    }
  }, [ref])

  useEffect(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [updateHeight])

  return (
    <div className={styles.wrapper} ref={ref}>
      <img
        src='https://res.cloudinary.com/exandria/image/upload/v1646795893/todo-list/notebook.jpg'
        style={{ height: height, maxHeight: '970px' }}
        alt='notebook'
      />
      <div
        className={styles.container}
        style={
          height < 970
            ? {
                left: height / 5.5,
                top: height / 7.24,
                fontSize: `${height / 53.888}px`,
              }
            : { fontSize: '18px' }
        }
      >
        <Lists />
        <Items />
      </div>
    </div>
  )
}
export default Content
