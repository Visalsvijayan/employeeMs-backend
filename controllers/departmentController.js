import { createError } from '../utils/createError.js'
import Department from '../models/department.js';

const addDepartment=async(req,res,next)=>{
    try {
        const {dep_name,description}=req.body;
        const existing=await Department.findOne({dep_name})
        if(existing){
            return next(createError('Department Name already exist.Please try with another',409))
        }
        const newDep=new Department({
            dep_name,
            description
        })
        await newDep.save() 
        return res.status(200).json({success:true,department:newDep})

    } catch (error) {
        return next(createError('ServerError',500))

    }
}
const tableData=async(req,res,next)=>{
    
    try {
        const department=await Department.find()
        
        return res.status(200).json({success:true,data:department})
    } catch (error) {
        return next(createError('ServerError',500))
    }
}
const editDepartment=async(req,res,next)=>{
    try {
        const id=req.params.id
        const data=await Department.findById(id)
        res.status(200).json({success:true,data})
    } catch (error) {
        return next(createError('ServerError',500))
    }
}
const updateData=async(req,res,next)=>{
    try {
        const {id}=req.params
        const {dep_name,description}=req.body;
        const existing=await Department.findOne({dep_name})
        if(existing){
            return next(createError('Department Name already exist.Please try with another',409))
        }
        const data=await Department.findByIdAndUpdate(id,{
            dep_name,description
        },{new:true})
        if (!data) {
            return next(createError('Department not found', 404))
        }

         res.status(200).json({success:true,data})
    } catch (error) {
        return next(createError('ServerError',500))

    }
}
const deleteDepartment=async(req,res,next)=>{
    try {
        const {id}=req.params
        const existing=await Department.findById(id)
        if(!existing){
            return next(createError('Id not matching ,Something went wrong', 404))
        }
        const deletedDep=await Department.findById(id)
        await deletedDep.deleteOne()
        return res.status(200).json({success:true,deletedDep})
    } catch (error) {
        return next(createError('ServerError',500))
    }
}
export default{
    addDepartment,
    tableData,
    editDepartment,
    updateData,
    deleteDepartment
}

