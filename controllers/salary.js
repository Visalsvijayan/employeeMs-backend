import Employee from "../models/employee.js"
import Salary from "../models/salary.js"
import { createError } from '../utils/createError.js'

const fetchEmployeesOfDepartment=async(req,res,next)=>{
    try {
        const {depId}=req.params
        const data=await Employee.find({department:depId}).populate('userId')
        return res.status(200).json({success:true,data})
    } catch (error) {
        return res.status(500).json({success:false,message:'server error'})
    }
}
const postSalary=async(req,res,next)=>{
    try {
        const {departmentId,employeeId,salary,allowance,deduction,payDate}=req.body
        if(!departmentId||!employeeId||!salary||!allowance||!deduction||!payDate){
            return res.status(404).json({success:false})
        }
        console.log(req.body)
        const netSalary=Number(salary)+Number(allowance)-Number(deduction)
        const newSalary=new Salary({
            employeeId,
            salary,
            netSalary,
            allowance,
            deduction,
            payDate

            
        })
        await newSalary.save()
        return res.status(200).json({success:true})
    } catch (error) {
        return next(createError( error.message, 500))
        
    }
}


const getSalaryOfEmployee=async(req,res,next)=>{
    try {
        const {id}=req.params
         
        let data=await Salary.find({employeeId:id}).populate('employeeId')
        if(data.length<1){
            const employee=await Employee.findOne({userId:id})
             
            data=await Salary.find({employeeId:employee._id}).populate('employeeId')

        }
         
        
       return res.status(200).json({success:true,data})
    } catch (error) {

        return next(createError( error.message, 500))
    }
}
export {
    fetchEmployeesOfDepartment,
    postSalary,
    getSalaryOfEmployee
}