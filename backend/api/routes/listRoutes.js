const express = require('express')
const {
  getLists,
  createList,
  updateList,
  deleteList,
} = require('../controllers/listController.js')

const { verifyAccessToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', verifyAccessToken, createList)
router.get('/', verifyAccessToken, getLists)
router.put('/:id', verifyAccessToken, updateList)
router.delete('/:id', verifyAccessToken, deleteList)

module.exports = router
