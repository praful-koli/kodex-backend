const app = require('./src/app')
const connetDB = require('./src/config/db')

connetDB()
app.listen(3000 , ()=>{
    console.log('server running on port 3000')
})