import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/createError.js'

const login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return next(createError('Email and password are required',400))
        }
        const user=await User.findOne({email})
        if(!user || !await bcrypt.compare(password,user.password)){
            // return res.status(401).json({message:'Invalid credentials'})
            return next(createError('Invalid credentials',401))
        }
        //generate JWT token
        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_KEY,
            {expiresIn:'1d'}
        )

        res.status(200).json({
            success:true,
            token,
            user:{id:user._id,name:user.name,role:user.role}

        })
    } catch (error) {
        // res.status(500).json({ message: 'Server error' });
        next(error)
    }
}

const verify=(req,res)=>{
    return res.status(200).json({success:true,user:req.user})
}

export {login,verify}