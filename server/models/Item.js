import { Schema, model, Types } from 'mongoose'

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the item name'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide the image'],
    },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please provide the category'],
    },
    address: {
      type: String,
      required: [true, 'Please provide the address'],
    },
    city: {
      type: String,
      required: [true, 'Please provide the city'],
    },
    description: {
      type: String,
      required: [true, 'Please provide the description'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

export default model('Item', itemSchema)
