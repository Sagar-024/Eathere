import express from 'express'
import { getLocalFoods } from '../controllers/foodController.js'

const router = express.Router()

router.post('/', getLocalFoods)

export default router
