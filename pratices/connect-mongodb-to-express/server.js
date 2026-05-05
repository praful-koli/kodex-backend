const app = require('./src/app')
let PORT = 3000
app.listen(3000, ()=> {
    console.log(`Server is runing on ${PORT}`)
})