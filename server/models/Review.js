import { Schema, model, Types } from 'mongoose'

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      default: '',
      trim: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the user'],
    },
    item: {
      type: Types.ObjectId,
      ref: 'Item',
      required: [true, 'Please provide the item'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
)

export default model('Review', reviewSchema)
