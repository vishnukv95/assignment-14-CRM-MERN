import caseModel from "../models/caseModel.js";



export const getAllCases = async (req,res)=>{
   try{
        const cases = await caseModel.find({})
        if(!cases.length)return res.status(404).json({error:'no cases to be displayed'})
        res.status(200).json(cases)
   }catch(err){
        console.error(err.message)
        res.status(500).json({error:'server error'})
   }
}

export const getMyCase = async (req,res)=>{
    const id = req.params.id
    try {
        const cases = await caseModel.find({customer:id})
        res.status(200).json(cases)
    } catch (error) {
     console.error(error.message);
    res.status(500).json({ error: "Server error" });
    }
}

export const createCase = async (req,res)=>{
        const {title,description,customer,assignedTo,priority,status} = req.body
        if(!title || !description || !customer) return res.status(400).json({error:"title,description and customer id is required"})
    try{
        const newCase = await caseModel.create({title,description,customer,assignedTo,priority,status})
        res.status(201).json({message:'case created successfully',case:newCase})
    }catch(err){
        console.error(err.message)
        res.status(500).json({error:'server error'})
    }
}

export const updateCase = async (req,res)=>{
    try{
         const {id} = req.params
         const updatedCase = await caseModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
         if(!updatedCase)return res.status(404).json({error:"case not found"})
         res.status(200).json({message:"case updated successfully",case:updatedCase})
    

    }catch(err){
         console.error(err.message)
         res.status(500).json({error:"server error"})
    }
}


export const deleteCase = async (req,res)=>{
    try {
        const deletedCase = await caseModel.findByIdAndDelete(req.params.id)
       if(!deletedCase) return res.status(404).json({error:"case not found"})
       res.json({message:"case deleted successfully",deletedCase})

    } catch (error) {
        console.error(error.message)
        res.status(500).json({error:"server error"})
    }

}