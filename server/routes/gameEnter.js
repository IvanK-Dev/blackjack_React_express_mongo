const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const gameModel=require('../models/gameModel')

router.post('/gamein',async(req,res)=>{
    try {
        const {objectId}=req.body;
        const object=await gameModel.findOne({_id:objectId})

        if(!object){
            return res.status(404).json({message:'Game not found'})
        }
        
        const token=jwt.sign({objectId:object._id}, process.env.JWT_SECRET)
    res.json({token})
   
   
    } catch (error) {
        
        console.log(error)
        res.status(500).json({message:'Server Error'})
    }
})

module.exports = router;