const mongoose = require('mongoose')

const db = process.env.MONGO_DB_NS

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const todoListDB = mongoose.connection.useDb(db)

module.exports = todoListDB.model('List', listSchema)
