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
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], 
        required: true,
      },
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


foodSpotSchema.index({ coordinates: '2dsphere' })

export default model('FoodSpot', foodSpotSchema)
