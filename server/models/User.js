const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  email: {
    type: String,
    uniquq: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  income: {
    type: Number,
    default: 0,
  },
  expence: {
    type: Number,
    default: 0,
  },
  savings: {
    type: Number,
    default: 0,
  },
  total_bills: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
