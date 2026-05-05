const express = require("express");
const dotenv = require("dotenv");
const userModel = require("./models/user.model");

const app = express();
dotenv.config();

app.use(express.json());

app.post("/api/create-user", async (req, res) => {
  try {
    let { name, email, moblie, age } = req.body;

    let user = await userModel.create({
      name,
      email,
      moblie,
      age
    });

    return res.status(201).json({
        message : 'User Created',
        user:user
    })


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});




app.get('/api/user' , async(req, res)=> {
    
    let users = await userModel.find();
    return res.status(200).json({
        meassage : "User fetch succesfuly",
        users : users
    })
})

module.exports = app;
