import { createError } from '../utils/createError.js'
import Department from '../models/department.js';
import User from '../models/user.js';
import Employee from '../models/employee.js';
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        // cb(null,'public/uploads')
        cb(null, path.join(__dirname, '../public/uploads')) 
    },
    filename:(req,file,cb)=>{
        const uniqueName = Date.now() + '-' + file.originalname
        cb(null, uniqueName)
    }
})
const upload=multer({storage})
const postNewEmployee=async(req,res,next)=>{
    try {
        const {
            name,
            email,
            dob,
            employeeId,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role
        }=req.body
        const user=await User.findOne({email})
        if(user){
             return next(createError('User already exit',409))
        }
        const hashPassword=await bcrypt.hash(password,10)
        const registerUser=new User({
            name,
            email,
            password:hashPassword,
            role,
            profileImage:req.file ? req.file.filename:""
      })
      const saveUser=await registerUser.save()
      const newEmployee=new Employee({
        userId:saveUser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary


      })
      await newEmployee.save()
      res.status(200).json({success:true,message:'employee created'})
    } catch (error) {
        
         return next(createError( 'Internal Server Error' ||error.message, 500))
        
    }
}

const getEmployees=async(req,res,next)=>{
    try {
        const data=await Employee.find()
                .populate({
                    path:'userId',
                    select:'-password'
                })
                .populate('department')
                
        
        res.status(200).json({success:true,employeeData:data})
    } catch (error) {
        return next(createError('Employees server error',500))
    }
}

const viewEmployee=async(req,res,next)=>{
    try {
        const {id}=req.params
     
        // const{userId}=req.params
        
        const employee=await Employee.findById(id)
            .populate({
                path:'userId',
                select:'-password'
            })
            .populate('department')
         
         
         return res.status(200).json({
            success:true,
            data:{
                image:employee.userId.profileImage,
                name:employee.userId.name,
                employeeId:employee.employeeId,
                dob:employee.dob,
                gender:employee.gender,
                departmentId:employee.department._id,
                department:employee.department.dep_name,
                maritalStatus:employee.maritalStatus,
                designation:employee.designation,
                salary:employee.salary


            }
        }) 

    } catch (error) {
        console.log(error)
        return next(createError('Employees viewpage server error',500))
    }
}

const viewUSer=async(req,res,next)=>{
    try {
        const {userId}=req.query
         const user=await Employee.find({userId:userId}).populate('department')
         
         return res.status(200).json({success:true,data:{
                employeeId:user[0].employeeId,
                department:user[0].department.dep_name,
                dob:user[0].dob.toLocaleDateString(),
                gender:user[0].gender,
                maritalStatus:user[0].maritalStatus
         }})
    } catch (error) {
        
         return next(createError('User viewpage server error',500))
    }
}

const editEmployee=async(req,res,next)=>{
    try {
        const {id}=req.params
        const {name,dob,maritalStatus,designation,departmentId,salary}=req.body;
        
        const employee=await Employee.findById(id)
        if(!employee){
            return res.status(404).json({success:false,message:'Employee not found'})
        }
        const user=await User.findById(employee.userId)
        if(!user){
            return res.status(404).json({success:false,message:'user not found'})

        }


        user.name=name
        employee.dob=dob;
        employee.maritalStatus=maritalStatus;
        employee.designation=designation;
        employee.department=departmentId
        employee.salary=salary;

        await employee.save()
        await user.save()
        res.status(200).json({success:true})
    } catch (error) {
         return res.status(500).json({success:false,message:'server error'})

    }
}
export {
    postNewEmployee,
    upload,
    getEmployees,
    viewEmployee,
    editEmployee,
    viewUSer
}