require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./src/routes");
const { globalErrorHandler } = require("./src/utils/error");

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(morgan("tiny"));
  app.use(express.json());
  app.use(routes);
  app.use(globalErrorHandler);

  app.get("/ping", (req, res) => {
    res.status(200).json({ message : "pong?" });
  })

  return app;
};

module.exports = { createApp };