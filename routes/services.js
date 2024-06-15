const express = require("express");
const Query = require("../model/serviceModel");
const intercom = require("intercom-client");
const dotenv = require("dotenv");
dotenv.config();
// TODO : set token in env variable

const router = express.Router();

router.post("/createquery", (req, res) => {
  console.log("req body", req.body, "typeof id ", typeof req.body.googleID);

  const serviceDoc = new Query({
    googleId: req.body.googleId,
    category: req.body.formData.category,
    comment: req.body.formData.comment,
  });
  serviceDoc.save().then((result, err) => {
    if (err) res.send(err);
    res.send(result);
  });
});

router.post("/seequery", (req, res) => {
  console.log(req.body);
  try {
    Query.find({
      googleId: req.body.googleId,
      category: req.body.category,
    }).then((result) => {
      console.log(result);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
