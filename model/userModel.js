const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    googleId: String,
    user: Object,
    displayName: String,
  })
);
module.exports = User;
