import customerModel from "../models/customerModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"





export const getAllCustomers = async (req,res)=>{
  try{
      const customers = await customerModel.find({})
      if(!customers.length) return res.status(404).json({error:"No Customers found"})
      res.json(customers)
  }catch(err){
      console.error(err.message)
      res.status(500).json({error:"server error"})
  }
}


export const createCustomer = async (req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({error:"fill all fields"})
    }
 try{
    const existingEmail = await customerModel.findOne({email})
    if(existingEmail)return res.status(409).json({error:"Email already exists"})
    
    const passwordHashed = await bcrypt.hash(password,10)
   
    const newCustomer = await customerModel.create({name,email,password:passwordHashed})
   
    const token = jwt.sign({email},process.env.SECRET_KEY)
   

    const customerData = await customerModel.findById(newCustomer._id).select("-password")
    res.status(201).json({message:"customer created",customer:customerData,token})

 }catch(err){
    console.error(err.message)
    res.status(500).json({error:"server error"})
 }
}


export const updateCustomer = async (req,res)=>{
     const authHeader = req.headers.authorization
     if(!authHeader) return res.status(401).json({error:"token not available"})
     const token = authHeader.split(" ")[1];
     let verifyCustomer;
     try {
        verifyCustomer = jwt.verify(token,process.env.SECRET_KEY)
      
     } catch (error) {
       return res.status(401).json({error:"customer not authenticated"})
     }
     try{
     const updates = req.body
     const customer = await customerModel.findByIdAndUpdate(req.params.id,updates,{new:true})
     if(!customer)return res.status(404).json({error:"Customer not found"})
     
    res.status(200).json({message:"Updated successfully",customers:customer})

  
  
  }catch(err){
   console.error(err.message)
   res.status(500).json({error:"server error"})
 }
}


export const deleteCustomer = async (req,res)=>{
  const authHeader = req.headers.authorization
  if(!authHeader) return res.status(400).json({error:"Token not available"})
  const token = authHeader.split(" ")[1]
  let verify;
 try {
      verify = jwt.verify(token,process.env.SECRET_KEY)

 } catch (error) {
     return res.status(401).json({error:"invalid or expired token Login again"})
 }
  try{
       const {id} = req.params
       const deletedCustomer = await customerModel.findByIdAndDelete(id)
       if(!deletedCustomer)return res.status(404).json({error:"Customer not found"})
       res.status(200).json({message:"Customer deleted successfully",deletedCustomer})
  }catch(err){
       console.error(err.message)
       res.status(500).json({error:"server error"})
  }
}