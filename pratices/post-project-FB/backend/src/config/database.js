const mongoose = require('mongoose')

async function connectDB(){
   await mongoose.connect(procces.env.MONGODB_URL)
   .then(()=>{
    console.log('Database connected successfully..')
   })
};


module.exports = connectDB