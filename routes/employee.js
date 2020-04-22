
//load dependencies

const express = require("express"),
  mongoose = require("mongoose"),
  employeeRouter = express.Router();

//import schema models
const Employee = require("../models/Employee");

employeeRouter.post("/createEmployee", (req, res) => {
    let employee = new Employee(req.body);
    employee.save().then((data) => {
     return res.status(200).json({message:'Success',data:data});
    }).catch((e) => {
        res.status(500).json({message:'Internal server error'});
    });
});

employeeRouter.get("/fetchEmployees", (req, res) => {
    Employee.find({}).then((data) => {
     return res.status(200).json({message:'Success',data:data});
    }).catch((e) => {
        res.status(500).json({message:'Internal server error'});
    });
});

employeeRouter.put("/updateEmployee", (req, res) => {
    Employee.findOne({_id:req.body._id}).then((data) => {
        if(!data){
            return res.status(400).json({message:'Employee not found'})
        }
        data.empId = req.body.empId;
        data.salary = req.body.salary;
        data.address = req.body.address;
        data.name = req.body.name;
        data.mobile  = req.body.mobile;
        data.role = req.body.role;
        data.email = req.body.email;
        return data.save();
    }).then((result) => {
        res.status(200).json({message:"success",data:result});
    }).catch((e) => {
        console.log(e)
        res.status(500).json({message:'Internal server error'});
    });
});


employeeRouter.delete("/deleteEmployee", (req, res) => {
    Employee.findOneAndRemove({_id:req.body._id}).then((data) => {
        if(!data){
            return res.status(400).json({message:'Employee not found'})
        }
        res.status(200).json({message:"Employee deleted"});
    }).catch((e) => {
        res.status(500).json({message:'Internal server error'});
    });
});



module.exports = employeeRouter;
