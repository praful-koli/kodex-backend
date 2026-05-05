const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    image : {
        type : String,
        required : [true , 'Image url required'],
        
    },
    caption : {
        type : String ,
        required : [true , 'Caption  required']
    },
})


const postModel = mongoose.model('posts' , postSchema)

module.exports = postModel 