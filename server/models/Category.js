import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide category name'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide category image'],
    },
    rank: {
      type: Number,
      required: [true, 'Please provide rank'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

export default model('Category', categorySchema)
