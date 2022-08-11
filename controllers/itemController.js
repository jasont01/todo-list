const List = require('../models/listModel.js')
const Item = require('../models/itemModel.js')

/**
 * @desc Get all items owned by user
 * @route GET /api/items
 * @access Private
 */
const getItems = async (req, res) => {
  const items = await Item.find({ user: req.user._id }).select('-__v')

  res.status(200).json(items)
}

/**
 * @desc Crate a new Item
 * @route POST /api/items
 * @access Private
 */

const createItem = async (req, res) => {
  const { description, date, priority, listId } = req.body

  if (!description) {
    return res.status(400).json({ error: 'Please add a description' })
  }

  const list = await List.findById(listId)

  if (!list) {
    return res.status(400).json({ error: 'List not found' })
  }

  if (!list.user.equals(req.user._id)) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  const newItem = await Item.create({
    user: req.user._id,
    description,
    date,
    priority,
    listId,
  })

  list.items.push(newItem._id)
  await list.save()

  res.status(201).json(newItem)
}

/**
 * @desc Update an Item
 * @route PUT /api/items/:id
 * @access Private
 */
const updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (!item) {
    return res.status(400).json({ error: 'Item not found' })
  }

  if (!item.user.equals(req.user._id)) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  const { description, date, priority, completed, listId } = req.body

  if (listId && listId !== item.listId) {
    const oldList = await List.findById(item.listId)
    const newList = await List.findById(listId)

    if (!oldList || !newList) {
      return res.status(400).json({ error: 'List not found' })
    }

    if (!newList.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Not authorized' })
    }

    oldList.items.pull(item._id)
    newList.items.push(item._id)

    await oldList.save()
    await newList.save()
  }

  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    {
      description,
      date,
      priority,
      completed,
      listId,
    },
    {
      new: true,
    }
  )

  res.status(200).json(updatedItem)
}

/**
 * @desc Delete an item
 * @route DELETE /api/items/:id
 * @access Private
 */
const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (!item) {
    return res.status(400).json({ error: 'Item not found' })
  }

  if (!item.user.equals(req.user._id)) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  const list = await List.findById(item.listId)

  if (!list) {
    return res.status(400).json({ error: 'List not found' })
  }

  list.items.pull(item)
  await list.save()

  await item.remove()

  res.status(200).json({ id: req.params.id })
}

module.exports = { getItems, createItem, updateItem, deleteItem }
