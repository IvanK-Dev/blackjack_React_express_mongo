const mongoose=require('mongoose')

const gameSchema=new mongoose.Schema({
    _id:String,
})

const gameModel=mongoose.model('Object',gameSchema)
module.exports=gameModel