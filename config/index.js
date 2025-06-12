const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const morgan = require("morgan")

// Middleware configuration
function config(app) {
  
  app.use(logger("dev")); 
  app.use(morgan("dev"));
  app.use(express.static("public"));


  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [process.env.ORIGIN]
    })
  );

  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

module.exports = config