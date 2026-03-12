require("dotenv").config();
const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ error in connecting with db", error);
  }
};

module.exports = connectToDb;