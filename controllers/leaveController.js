import Employee from "../models/employee.js";
import Leave from "../models/leave.js"
import { createError } from '../utils/createError.js'
const addLeave=async(req,res,next)=>{
  try {
    const {userId,leaveType,startDate,endDate,reason}=req.body;
    const employee=await Employee.findOne({userId:userId})
     
    const newLeave=new Leave({
      employeeId:employee._id,
      leaveType,
      startDate,
      endDate,
      reason   
  })
  await newLeave.save();
  return res.status(200).json({success:true})
  } catch (error) {
      return next(createError( 'Internal Server Error' ||error.message, 500))
  }
}

const listLeave=async(req,res,next)=>{
  try {
    const {id}=req.params
    
    const employee=await Employee.findOne({userId:id}) || await Employee.findById(id)
    const data=await Leave.find({employeeId:employee._id})
    res.status(200).json({success:true,data})
  } catch (error) {
     return next(createError( 'Internal Server Error' ||error.message, 500))
  }
}

const adminLeaveManagement=async(req,res,next)=>{
  try {
    const leaves=await Leave.find().populate({
    path: "employeeId",
    populate: [
      { path: "userId", select: "name" }, 
      { path: "department", select: "dep_name" }
    ]
  });
   
  return res.status(200).json({success:true,leaves})



  } catch (error) {
     return next(createError( 'Internal Server Error' ||error.message, 500))
  }
}
const adminLeaveView=async(req,res,next)=>{
  try {
    const {id}=req.params;
      const leaves=await Leave.findById(id).populate({
    path: "employeeId",
    populate: [
      { path: "userId", select: "name profileImage" }, 
      { path: "department", select: "dep_name" }
    ]
  });
  const data={
    name:leaves.employeeId.userId.name,
    employeeId:leaves.employeeId.employeeId,
    leaveType:leaves.leaveType,
    reason:leaves.reason,
    department:leaves.employeeId.department.dep_name,
    startDate:leaves.startDate,
    endDate:leaves.endDate,
    status:leaves.status,
    image:leaves.employeeId.userId.profileImage,
    id:leaves._id
  }

  return res.status(200).json({success:true,data})


  } catch (error) {
     return next(createError( 'Internal Server Error' ||error.message, 500))
  }
}
const changeLeaveStatus=async(req,res,next)=>{
  try {
    const {status}=req.body;
    const {id}=req.params
    const update=await Leave.findByIdAndUpdate(id,{$set:{status:status}},{new:true})
    if(!update){
      res.status(400).json({success:false,message:'update failed'})
    }
    res.status(200).json({ success: true, data: update});
  } catch (error) {
     return next(createError(  error.message, 500))
  }
}
export{
    addLeave,
    listLeave,
    adminLeaveManagement,
    adminLeaveView,
    changeLeaveStatus
}