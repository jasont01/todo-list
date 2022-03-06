import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js'

/**
 * @desc   Register user
 * @route  POST /api/user/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields are required')
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (!user) {
    res.status(400)
    throw new Error('Error registering user')
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
})

/**
 * @desc   Login user
 * @route  POST /api/user/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && bcrypt.compare(password, user.password)) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400).json({
      message: 'Invalid credentials',
    })
  }
})

/**
 * @desc   Get user
 * @route  GET /api/user
 * @access Private
 */
const getUser = asyncHandler(async (req, res) => {
  try {
    req.user = await User.findById(req.userId).select('-password')
    res.status(200).json(req.user)
  } catch (err) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export { registerUser, loginUser, getUser }
