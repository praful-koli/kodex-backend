import dotenv from 'dotenv'
dotenv.config()

if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined in enviroment variables')
}

if (!process.env.PORT) {
    throw new Error('PORT is not defined in enviroment variables')
}
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in enviroment variables')
}


const config = {
    MONGODB_URL : process.env.MONGODB_URL,
    PORT : process.env.PORT,
    JWT_SECRET :process.env.JWT_SECRET
}


 export default config 
