const express = require('express');
const app = express();
const cors = require("cors");
const routes = require("./routes/v1");

// enable cors
app.use(cors());
app.options("*", cors());

bodyParser = require('body-parser').json();

app.use(bodyParser);

// v1 api routes
app.use("/v1", routes);

module.exports = app;
