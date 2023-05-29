const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;
