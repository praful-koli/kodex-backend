const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name : String,
    email : String,
    moblie : Number,
    age : Number,
    CreatAt : {
        type: Date,
        default : Date.now()
    }
})


const userModel  = mongoose.model('users', userSchema)

module.exports = userModel