import User from "../models/user.js";
import bcrypt from 'bcrypt'
import { createError } from '../utils/createError.js'

const postPasswordChange=async(req,res,next)=>{
    try {
        const {userId}=req.params
        console.log(req.body)
        const {oldPassword,newPassword,confirmPassword}=req.body;
        const user=await User.findById(userId)
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:'Enter correct existing Password'})
        }
        const hashedPassword=await bcrypt.hash(newPassword,10)

        user.password=hashedPassword

        await user.save()
        res.status(200).json({success:true})
    } catch (error) {
         return next(createError( error.message, 500))
    }
}

export {postPasswordChange}