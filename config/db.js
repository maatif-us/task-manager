const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected to db');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
