let mongoose = require('mongoose')

let connteDB = async()=> {
  try {
    await mongoose.connect('mongodb://localhost:27017/kodex')
    console.log('Database connted')
  } catch (error) {
     console.log(error)
  }
}

module.exports = connteDB