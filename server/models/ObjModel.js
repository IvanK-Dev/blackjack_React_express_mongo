const mongoose=require('mongoose')

const ObjSchema=new mongoose.Schema({
    _id:String,
})

const ObjModel=mongoose.model('Object',ObjSchema)
module.exports=ObjModel