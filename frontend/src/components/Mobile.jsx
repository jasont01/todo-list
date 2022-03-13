import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'

const variants = {
  lists: { x: -140 },
  items: { x: -635 },
}

const Mobile = ({ content }) => {
  const [showItems, setShowItems] = useState(false)

  return (
    <>
      <motion.div
        animate={showItems ? 'items' : 'lists'}
        variants={variants}
        transition={{ ease: 'easeOut' }}
      >
        {content}
      </motion.div>
      <Button variant='contained' onClick={() => setShowItems(true)}>
        &gt;
      </Button>
      <Button variant='contained' onClick={() => setShowItems(false)}>
        &lt;
      </Button>
    </>
  )
}
export default Mobile
