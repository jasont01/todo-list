const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const verifyRefreshToken = async (req, res, next) => {
  if (!req.cookies.token) return res.sendStatus(401)

  try {
    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) return res.sendStatus(401)

    next()
  } catch (error) {
    return res.sendStatus(403)
  }
}

const verifyAccessToken = async (req, res, next) => {
  if (!req.headers.authorization) return res.sendStatus(401)

  try {
    const token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) return res.sendStatus(401)

    next()
  } catch (error) {
    return res.sendStatus(403)
  }
}

module.exports = { verifyRefreshToken, verifyAccessToken }
