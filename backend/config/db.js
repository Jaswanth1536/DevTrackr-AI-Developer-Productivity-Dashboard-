const mongoose = require('mongoose');

let isMockDB = false;

const connectDB = async () => {
  if (process.env.USE_MOCK_DB === 'true') {
    console.log('⚠️ Running in Mock DB mode (persistent JSON store). No local MongoDB server required.');
    isMockDB = true;
    return true;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devtrackr');
    console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.log('⚠️ Falling back to Mock DB mode (persistent JSON store).');
    isMockDB = true;
    return true;
  }
};

const getIsMockDB = () => isMockDB;

module.exports = { connectDB, getIsMockDB };
