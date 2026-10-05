const mongoose = require("mongoose");
require("dotenv").config(); 

const connectToMongo = async () => {
  await mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  console.log("connected to mongoDB Sucesfully");
};

module.exports = connectToMongo;