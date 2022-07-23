const List = require('../models/listModel.js')
const Item = require('../models/itemModel.js')

/**
 * @desc Get all lists owned by user
 * @route GET /api/lists
 * @access Private
 */
const getLists = async (req, res) => {
  const lists = await List.find({ user: req.user._id }).select('-__v')

  res.status(200).json(lists)
}

/**
 * @desc Crate a new list
 * @route POST /api/lists
 * @access Private
 */

const createList = async (req, res) => {
  const title = req.body.title ? req.body.title : 'Untitled List'

  const newList = await List.create({
    user: req.user._id,
    title,
  })

  res.status(201).json(newList)
}

/**
 * @desc Update a list
 * @route PUT /api/lists/:id
 * @access Private
 */
const updateList = async (req, res) => {
  const list = await List.findById(req.params.id)

  if (!list) {
    return res.status(400).json({ error: 'List not found' })
  }

  //if (list.user.toString() !== req.user._id) {
  if (!list.user.equals(req.user._id)) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  const title = req.body.title ? req.body.title : list.title

  const updatedList = await List.findByIdAndUpdate(
    req.params.id,
    {
      title,
    },
    {
      new: true,
    }
  )

  res.status(200).json(updatedList)
}

/**
 * @desc Delete a list
 * @route DELETE /api/lists/:id
 * @access Private
 */
const deleteList = async (req, res) => {
  const list = await List.findById(req.params.id)

  if (!list) {
    return res.status(400).json({ error: 'List not found' })
  }

  if (!list.user.equals(req.user._id)) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  await Item.deleteMany({ listId: req.params.id, user: req.user._id })
  await list.remove()

  res.status(200).json({ _id: req.params.id })
}

module.exports = { getLists, createList, updateList, deleteList }
