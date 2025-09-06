import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {addLeave,listLeave,adminLeaveManagement,adminLeaveView,changeLeaveStatus} from '../controllers/leaveController.js'
const router=express.Router();
router.post('/add',authMiddleware,addLeave)
router.get('/:id',authMiddleware,listLeave)
router.get('/',authMiddleware,adminLeaveManagement)
router.get('/view/:id',authMiddleware,adminLeaveView)
router.put('/view/:id',authMiddleware,changeLeaveStatus)
export default router