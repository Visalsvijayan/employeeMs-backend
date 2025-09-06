import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
 import {upload,postNewEmployee,getEmployees,viewEmployee,editEmployee,viewUSer} from '../controllers/employeeController.js'
const router=express.Router()
router.post('/add',authMiddleware,upload.single('image'),postNewEmployee)
router.get('/',authMiddleware,getEmployees)
router.get('/view',authMiddleware,viewUSer)
router.get('/:id',authMiddleware,viewEmployee)

router.put('/edit/:id',authMiddleware,editEmployee)
export default router