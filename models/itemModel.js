const mongoose = require('mongoose')

const db = process.env.MONGO_DB_NS

const itemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'none'],
      default: 'none',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'List',
    },
  },
  {
    timestamps: true,
  }
)

const todoListDB = mongoose.connection.useDb(db)

module.exports = todoListDB.model('Item', itemSchema)
