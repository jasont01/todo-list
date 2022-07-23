const express = require('express')
const { verifyRefreshToken } = require('../middleware/authMiddleware')
const {
  refreshToken,
  loginUser,
  logoutUser,
  session,
} = require('../controllers/authController')

const router = express.Router()

router.post('/login', loginUser)
router.get('/session', session)
router.put('/refresh', verifyRefreshToken, refreshToken)
router.delete('/logout', verifyRefreshToken, logoutUser)

module.exports = router
