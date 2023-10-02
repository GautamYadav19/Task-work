const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mongodb:9410011857@cluster0.ubjhkbn.mongodb.net/test01?retryWrites=true&w=majority"
    );
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
