const mongoose = require("mongoose");

async function connectDB(url) {
  await mongoose.connect(url).then(() => {
    console.log("database connected");
  });
}
module.exports = { connectDB };
