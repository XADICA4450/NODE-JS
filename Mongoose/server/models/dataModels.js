const mongoose = require('mongoose');

const { Schema } = mongoose;

const DataSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price:{ type: String, required: true },
 
});

const DataModel = mongoose.model("Data", DataSchema);


module.exports=DataModel;
