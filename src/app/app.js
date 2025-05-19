const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const appConfig = require("./share/configs/app.conf");

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

require("./share/database/mongo.database").connect();

app.use("/api", require("./v1/routes"));

app.use((_, __, next) => {
  const error = new Error("Not found");
  error.statusCode = 404;
  next(error);
});

app.use((error, __, res, ____) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  const response = {
    message: message,
  };

  if (appConfig.NodeEnv === "development") {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
});

module.exports = app;
