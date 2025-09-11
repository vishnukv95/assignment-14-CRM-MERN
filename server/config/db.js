import mongoose from "mongoose";


export const connectDb =async ()=>{
    try{
        const connect = await  mongoose.connect(process.env.MONGO_URI)
        console.log("database Connected")
    }catch(err){
        console.error("database connection failed",err.message)
    }
 }

