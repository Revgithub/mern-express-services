const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  uniqueValidator = require("mongoose-unique-validator"),
  bcrypt = require("bcrypt");

//create a schema
const loginSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true
    },
    username: {
      type: String
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    }
  },
  {
    timestamps: true
  }
);

//engaing mongoose unique validator to the schema

loginSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique"
});

//method to encrypt password
loginSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//method to decrypt password
loginSchema.methods.validPassword = function(password) {
  let user = this;
  return bcrypt.compareSync(password, user.password,function(result){
      return  result;
  });
};

//create the model
const loginDataModel = mongoose.model("Login", loginSchema);

//export the model
module.exports = loginDataModel;
