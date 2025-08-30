const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log("Database connected");
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1); 
  }
};

module.exports = connectDb;
