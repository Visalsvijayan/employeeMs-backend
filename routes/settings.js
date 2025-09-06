import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {postPasswordChange} from  '../controllers/settings.js'

const router=express.Router()

router.post('/changePassword/:userId',authMiddleware,postPasswordChange)

export default router