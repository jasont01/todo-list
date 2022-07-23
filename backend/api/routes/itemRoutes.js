const express = require('express')
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController.js')

const { verifyAccessToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', verifyAccessToken, createItem)
router.get('/', verifyAccessToken, getItems)
router.put('/:id', verifyAccessToken, updateItem)
router.delete('/:id', verifyAccessToken, deleteItem)

module.exports = router
