const bcrypt = require('bcryptjs')
const User = require('../models/userModel.js')
const List = require('../models/listModel.js')
const Item = require('../models/itemModel.js')

/**
 * @desc   Register user
 * @route  POST /api/user/register
 * @access Public
 */
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'email & password are required' })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(400).json({ error: 'user already exists' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  })

  if (!user) return res.sendStatus(400)

  await List.create({
    user: user._id,
    title: 'Default List',
  })

  res.status(201).json(user)
}

/**
 * @desc   Get user
 * @route  GET /api/user
 * @access Private
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).json({ _id: user._id, email: user.email })
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized' })
  }
}

/**
 * @desc   Delete user
 * @route  DELETE /api/user
 * @access Private
 */
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  //if (user._id.toString() !== req.user._id.toString()) {
  if (!user._id.equals(req.user._id)) {
    return res.status(401).json({ error: 'Not authorized' })
  }

  await Item.deleteMany({ user: req.user._id })
  await List.deleteMany({ user: req.user._id })
  await User.findByIdAndDelete(req.user._id)

  res.status(204).end()
}

module.exports = { registerUser, getUser, deleteUser }
