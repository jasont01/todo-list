import express from 'express'
import {
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createItem)
router.route('/:id').put(protect, updateItem).delete(protect, deleteItem)

export default router
