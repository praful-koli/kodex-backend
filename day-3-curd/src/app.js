// create server
// configuration

const express = require("express");

const app = express();

app.use(express.json());
let users = [];

app.post("/get-user", (req, res) => {
  users.push(req.body);

  return res.status(201).json({
    message: "User created successfuly !",
  });
});

app.get("/users", (req, res) => {
  return res.status(200).json({
    message: "User fetch successfuly",
    users,
  });
});

app.patch("/users/update/:id", (req, res) => {
  const { id } = req.params;
  const { age } = req.body;

  users[id].age = age;

  return res.status(200).json({
    message: "user update successfuly",
    users,
  });
});

app.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);
  return res.status(200).json({
    message: "User deleted successfuly",
  });
});

module.exports = app;
