import mongoose from 'mongoose'

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
      enum: ['Low', 'Medium', 'High', 'None'],
      default: 'None',
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

export const Item = mongoose.model('Item', itemSchema)
