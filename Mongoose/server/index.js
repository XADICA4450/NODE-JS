const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose');

const { Schema } = mongoose;

const DataSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price:{ type: String, required: true },
 
});

const DataModel = mongoose.model("Data", DataSchema);

app.get("/data", async (req, res) => {
  try {
    const data = await DataModel.find({});
   
    res.status(200).json({ data: data, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/data/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedData = await DataModel.findByIdAndDelete(id);
      if (!deletedData) {
        return res
          .status(404)
          .json({ message: "failed to delete! | product not found!" });
      }
      res.status(200).json({
        deletedData: deletedData,
        message: "deleted successfully!",
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  


mongoose.connect('mongodb+srv://xadicahbazmp202:xadicahbazmp202@cluster0.lnkjt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
 
  .then(() => {
    console.log("Connected!")
    app.listen(port,() => {
        console.log(`Example app listening on port ${port}, url is http:localhost:${port}`)
    })
  });