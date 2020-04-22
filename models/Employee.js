const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//create a schema
const employeeSchema = new Schema(
  {
    empId: {
      type: String
    },
    name: {
      type: String,
      trim: true
    },
    age: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    mobile: {
      type: String,
      trim: true
    },
    isAddressPermanent: {
      type: Boolean
    },
    address: {
      type:String,
      trim:true
    },
    salary:{
    type:Number
    },
    role:{
        type:String, // 0-lead 1- developer 2-manager
        trim:true
    }
  },
  {
    timestamps: true
  }
);

//create the model
const employeeDataModel = mongoose.model("Employee", employeeSchema);

//export the model
module.exports = employeeDataModel;



