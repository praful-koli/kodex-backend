const exprss = require('express')
const app = exprss()

app.get('/' , (req, res) => {
    res.status(200).json({
        message : 'homme page'
    })
})

app.listen(3000 , ()=> {
    console.log('server is running on port 3000')
})