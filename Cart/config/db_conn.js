const mongoose = require('mongoose');
const redis = require('redis');
require('dotenv').config();

// Redis client setup (يمكنك تعديله لاحقًا حسب الحاجة)
const redisClient = redis.createClient();

// MongoDB connection using .env MONGO_URI
const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`))
  .catch(err => console.log(`❌ MongoDB connection error:`, err));

module.exports = mongoose;
