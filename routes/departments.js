import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import departmentController from '../controllers/departmentController.js'

const router=express.Router()
router.post('/add',authMiddleware,departmentController.addDepartment)
router.get('/',authMiddleware,departmentController.tableData)
router.get('/:id',authMiddleware,departmentController.editDepartment)
router.put('/:id',authMiddleware,departmentController.updateData)
router.delete('/:id',authMiddleware,departmentController.deleteDepartment)
export default router