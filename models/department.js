import mongoose  from "mongoose";
import Employee from '../models/employee.js'
import Salary from '../models/salary.js'
import Leave from '../models/leave.js'
const departmentSchema=new mongoose.Schema({
    dep_name:{type:String,required:true},
    description:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})

departmentSchema.pre('deleteOne',{ document: true, query: true },async function(next){
    try {
        const employee=await Employee.find({department:this._id})
        const empIds=employee.map((emp)=>emp._id)
        
        await Employee.deleteMany({department:this._id})
        await Salary.deleteMany({employeeId:{$in:empIds}})
        await Leave.deleteMany({employeeId:{$in:empIds}})
        next()
    } catch (error) {
        next(error)
    }
})

const Department=mongoose.model('Department',departmentSchema)
export default Department