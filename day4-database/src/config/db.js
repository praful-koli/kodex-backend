const mongoose = require('mongoose')

const connetDB = async() => {
    try {
        await mongoose.connect(process.env.MOGDB_URL)
        .then(()=>{
            console.log('Database connted ...')
        })
    } catch (error) {
        console.log(error)  
    } 
}


module.exports = connetDB