//load dependencies

const express = require("express"),
  mongoose = require("mongoose"),
  loginRouter = express.Router();

//import schema models
const Login = require("../models/Login");

loginRouter.post("/createAdmin", (req, res) => {
  let formData = {
    username: req.body.username,
    id: req.body.id
  };
  let admin = new Login(formData);
  admin.password = admin.generateHash(req.body.password);
  admin
    .save()
    .then(admin => {
      res.json({ message: "Registered successfully", details: admin });
    })
    .catch(e => {
      res.status(500).json({ message: "Internal server error", error: e });
    });
});

loginRouter.get("/admins", (req, res) => {
  Login.find({})
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ e: e });
    });
});

loginRouter.post("/login", (req, res) => {
  console.log(req.body.password);
  Login.findOne({ username: req.body.username })
    .then(data => {
      if (!data) {
        return res.status(400).json({ message: "User not exist" });
      }
      if (data.validPassword(req.body.password)) {
        return res.status(200).json({ message: "Login successfull" });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = loginRouter;
