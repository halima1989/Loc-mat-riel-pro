const express = require("express");
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const router = require('./Controllers/routes/myroutes');

require("dotenv").config();

app.use(cors())
app.use(express.json())



app.use("/api", router);
app.listen(process.env.PORT, () => {
  console.log("im listening on port", process.env.PORT)
});



