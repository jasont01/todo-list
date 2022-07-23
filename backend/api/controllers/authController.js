const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const cookieOptions = {
  maxAge: 180 * 24 * 60 * 60 * 1000, // 180 days
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
}

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  })
}

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '180d',
  })
}

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    const refreshToken = generateRefreshToken(user._id)

    await User.findByIdAndUpdate(user._id, {
      sessions: [...user.sessions, refreshToken],
    })

    res
      .status(200)
      .cookie('token', refreshToken, cookieOptions)
      .json({
        _id: user._id,
        email: user.email,
        accessToken: generateAccessToken(user._id),
      })
  } else {
    return res.status(400).json({ error: 'Invalid credentials' })
  }
}

// @desc    Check for existing session
// @route   GET /api/auth/session
// @access  Public
const session = async (req, res) => {
  if (!req.cookies.token)
    return res.json({
      accessToken: null,
    })

  try {
    const refreshToken = req.cookies.token
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(id)

    const validSession = user.sessions.find(
      (session) => session === refreshToken
    )
    if (!validSession) return res.sendStatus(403)

    res.json({
      _id: user._id,
      email: user.email,
      accessToken: generateAccessToken(id),
    })
  } catch (error) {
    res.json({
      accessToken: null,
    })
  }
}

// @desc    Refresh access token
// @route   PUT /api/auth/refresh
// @access  Private
const refreshToken = async (req, res) => {
  const id = req.user._id
  const refreshToken = req.cookies.token

  const user = await User.findById(id)

  const validSession = user.sessions.find((session) => session === refreshToken)
  if (!validSession) return res.sendStatus(403)

  res.status(200).json({ accessToken: generateAccessToken(id) })
}

// @desc    Logout user
// @route   DELETE /api/auth/logout
// @access  Private
const logoutUser = async (req, res) => {
  const refeshToken = req.cookies.token

  const user = await User.findById(req.user._id)

  await User.findByIdAndUpdate(user._id, {
    sessions: user.sessions.filter((session) => session !== refeshToken),
  })

  res
    .status(200)
    .clearCookie('token')
    .json({ success: true, message: 'User logged out successfully' })
}

module.exports = { refreshToken, loginUser, logoutUser, session }
