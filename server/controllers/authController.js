import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import customerModel from "../models/customerModel.js"
import userModel from "../models/userModel.js"

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password )return res.status(400).json({error:"email and password required"})
        
        let account = await customerModel.findOne({email}).select('+password')
        if(!account){
            account = await userModel.findOne({email}).select("+password")
        }
        if(!account)return res.status(404).json({error:"invalid credentials"})
       
        const isMatch = await bcrypt.compare(password,account.password)
        if(!isMatch) return res.status(400).json({error:"invalid credentials"})
       
        const token =  jwt.sign({id:account._id,role:account.role},process.env.SECRET_KEY)
        account.password = undefined
        res.json({message:"login successfull",token,role:account.role,user:account})
        
    }catch(err){
        console.error(err.message)
        res.status(500).json({error:"server error"})
    }
}

