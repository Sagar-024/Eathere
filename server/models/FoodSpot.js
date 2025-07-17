
import { Schema, model } from 'mongoose'

const foodSpotSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the food spot'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'Please provide the city'],
    },
    address: {
      type: String,
      default: '',
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    type: {
      type: String,
      enum: ['restaurant', 'dhaba', 'street', 'cafe'],
      default: 'restaurant',
    },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

export default model('FoodSpot', foodSpotSchema)
