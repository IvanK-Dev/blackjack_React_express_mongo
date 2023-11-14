const express=require('express')
const router=express.Router();
const gameEnterRoutes=require('./gameEnter')
const gamesRoutes=require('./games')

router.use('/gamein',gameEnterRoutes);
router.use('/create_game',gamesRoutes)

module.exports=router