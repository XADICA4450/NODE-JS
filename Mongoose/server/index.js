const express = require('express')
const app = express()
const dataRouter = require("./routes/dataRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors=require("cors")

dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT=process.env.PORT || 8000
app.use(cors());
app.use("/data", dataRouter);
app.use(express.json());

console.log(DB_URL);

mongoose.connect(DB_URL)
  .then(() => {
    console.log("Connected!")
    app.listen(PORT,() => {
        console.log(`Example app listening on port ${PORT}, url is http:localhost:${PORT}`)
    })
  });