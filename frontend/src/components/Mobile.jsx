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
      <Button
        sx={{ color: '#212529', backgroundColor: '#bada55' }}
        onClick={() => setShowItems(false)}
      >
        &lt; Lists
      </Button>
    </>
  )
}
export default Mobile
