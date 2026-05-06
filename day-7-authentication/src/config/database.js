import mongoose  from "mongoose";
import config from "./config.js";
const connectDB = async () => {
     try {
        await mongoose.connect(config.MONGODB_URL)
        .then(()=> {
            console.log('Database connected ')
        })
     } catch (error) {
        console.log("fild to connect database")
     }
}


export default connectDB