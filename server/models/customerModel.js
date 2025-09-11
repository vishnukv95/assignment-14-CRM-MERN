import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name: {type:String,required:true,unique:true},
    email:{type:String, unique:true,required:true},
    password:{type:String,required:true,select:false},
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    role:{type:String,default:"customer"}

})

const customerModel = mongoose.model("customers",customerSchema)

export default customerModel