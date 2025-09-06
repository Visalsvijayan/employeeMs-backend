import Department from "../models/department.js"
import Employee from "../models/employee.js"
import Leave from "../models/leave.js"
import Salary from "../models/salary.js"
import { createError } from '../utils/createError.js'

const getSummery=async(req,res,next)=>{
    try {
        const totalEmployee=await Employee.countDocuments()
        const totalDepartments=await Department.countDocuments()
        const totalSalary=await Salary.aggregate([
            {$group:{
                _id:null,totalSalary:{$sum:'$salary'}
            }}
        ])
        const totalLeave=await Leave.distinct('employeeId')
        const leaveStatus=await Leave.aggregate([
            {$group:{
                _id:'$status',
                count:{$sum:1}
            }}
        ])
        const leaveSummery={
            applied:totalLeave.length,
            approved:leaveStatus.find(item=>item._id==='Approved')?.count ||0,
            rejected:leaveStatus.find(item=>item._id==='Rejected')?.count ||0,
            pending:leaveStatus.find(item=>item._id==='Pending')?.count ||0
        }
        return res.status(200).json({
            totalEmployee,
            totalDepartments,
            totalSalary:totalSalary[0]?.totalSalary ||0,
            leaveSummery
        })

    } catch (error) {
          return next(createError('ServerError',500))
    }
}
 

export{
    getSummery
}