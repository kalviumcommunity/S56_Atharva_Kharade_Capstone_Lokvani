const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String
},{versionKey: false})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel