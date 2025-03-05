const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database conncecté....");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDb;
