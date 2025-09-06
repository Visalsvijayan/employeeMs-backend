import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { fetchEmployeesOfDepartment,postSalary ,getSalaryOfEmployee} from '../controllers/salary.js'

const router=express.Router()
router.get('/:depId',authMiddleware,fetchEmployeesOfDepartment)
router.post('/add',authMiddleware,postSalary)
router.get('/employee/:id',authMiddleware,getSalaryOfEmployee)
export default router