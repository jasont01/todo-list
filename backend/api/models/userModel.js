const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    sessions: [String],
  },
  {
    timestamps: true,
  }
)

const todoListDB = mongoose.connection.useDb('todo-list')

module.exports = todoListDB.model('User', userSchema)
