import express from 'express'
import {
  getLists,
  createList,
  updateList,
  deleteList,
} from '../controllers/listController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getLists).post(protect, createList)
router.route('/:id').put(protect, updateList).delete(protect, deleteList)

export default router
