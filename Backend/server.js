const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const patient = require("./Routers/patient");

mongoose.connect(process.env.MONGO_LINK)
  .then(() => { console.log("DataBase Connected.....");})
  .catch((err) => { console.log(err); });//db connection created here

app.use(cors());
app.use(express.json());


app.use(patient)

app.listen(process.env.PORT, () => {
  console.log("Server is running at " + process.env.PORT);
});

