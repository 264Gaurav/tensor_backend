const mongoose = require("mongoose");

const Query = mongoose.model(
  "Service_requests",
  new mongoose.Schema({
    googleId: String,
    category: String,
    comment: String,
  })
);
module.exports = Query;
