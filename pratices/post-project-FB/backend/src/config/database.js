const mongoose = require('mongoose')

async function connectDB(){
   await mongoose.connect('mongodb+srv://praful:PZpmImqBVj1gtIov@cluster1.1res76n.mongodb.net/post-project')
   .then(()=>{
    console.log('Database connected successfully..')
   })
};


module.exports = connectDB