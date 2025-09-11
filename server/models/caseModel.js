import mongoose from "mongoose";


const caseSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    customer:{type:mongoose.Schema.Types.ObjectId,ref:'customers',required:true},
    assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    priority:{type:String,enum:['low','medium','high'],default:'medium'},
    status:{type:String,enum:['pending','in review','closed'],default:'pending'}
},{timestamps:true})


const caseModel = mongoose.model('cases',caseSchema)

export default caseModel