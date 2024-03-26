const express = require('express')
const router = express.Router()

router.use(express.json())

const userModel = require('./userSchema')

router.get('/users',async(req,res)=>{
    try{
        let result = await userModel.find({});
        res.send(result);
        console.log("USER",result)
    }
    catch(err){
        console.log("USER ERROR",err)
    }
})

module.exports = router