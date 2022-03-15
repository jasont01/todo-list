import asyncHandler from 'express-async-handler'
import { List } from '../models/listModel.js'
import { Item } from '../models/itemModel.js'

/**
 * @desc Get all items owned by user
 * @route GET /api/items
 * @access Private
 */
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.userId }).select('-__v')

  res.status(200).json(items)
})

/**
 * @desc Crate a new Item
 * @route POST /api/items
 * @access Private
 */

const createItem = asyncHandler(async (req, res) => {
  const { description, date, priority, listId } = req.body

  if (!description) {
    res.status(400)
    throw new Error('Please add a description')
  }

  const list = await List.findById(listId)

  if (!list) {
    res.status(400)
    throw new Error('List not found')
  }

  if (list.user.toString() !== req.userId) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const newItem = await Item.create({
    user: req.userId,
    description,
    date,
    priority,
    listId,
  })

  list.items.push(newItem._id)
  await list.save()

  res.status(201).json(newItem)
})

/**
 * @desc Update an Item
 * @route PUT /api/items/:id
 * @access Private
 */
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (!item) {
    res.status(400)
    throw new Error('Item not found')
  }

  if (item.user.toString() !== req.userId) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const { description, date, priority, completed, listId } = req.body

  if (listId && listId !== item.listId) {
    const oldList = await List.findById(item.listId)
    const newList = await List.findById(listId)

    if (!oldList || !newList) {
      res.status(400)
      throw new Error('List not found')
    }

    if (newList.user.toString() !== req.userId) {
      res.status(401)
      throw new Error('Not authorized')
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
})

/**
 * @desc Delete a list
 * @route DELETE /api/items/:id
 * @access Private
 */
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (!item) {
    res.status(400)
    throw new Error('Item not found')
  }

  if (item.user.toString() !== req.userId) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const list = await List.findById(item.listId)

  if (!list) {
    res.status(400)
    throw new Error('List not found')
  }

  list.items.pull(item)
  await list.save()

  await item.remove()

  res.status(200).json({ id: req.params.id })
})

export { getItems, createItem, updateItem, deleteItem }
