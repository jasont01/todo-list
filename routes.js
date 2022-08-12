const express = require('express')

const router = express.Router()

router.use('/items', require('./routes/itemRoutes'))
router.use('/lists', require('./routes/listRoutes'))
router.use('/user', require('./routes/userRoutes'))
router.use('/auth', require('./routes/authRoutes'))

module.exports = router
