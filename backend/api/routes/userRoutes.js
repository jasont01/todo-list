const express = require('express')
const {
  registerUser,
  getUser,
  deleteUser,
} = require('../controllers/userController.js')

const { verifyAccessToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.get('/', verifyAccessToken, getUser)
//router.patch('/update', verifyAccessToken, updateUser)
router.delete('/:id', verifyAccessToken, deleteUser)

module.exports = router
