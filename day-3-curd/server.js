let app = require('./src/app')
let connteDB = require('./src/config/db')


app.listen(3000, ()=> {
    console.log('Server running on port 3000')
})
connteDB()