const mongoose = require("mongoose");

//const { Schema, model } = "mongoose";

const UserSchema = mongoose.Schema({
  username: { type: String, min: 4, unique: true, required: true },

  password: {
    type: String,
    required: true,
    min: 4,
  },
});

const Usermodel = mongoose.model("User", UserSchema);

module.exports = Usermodel;
