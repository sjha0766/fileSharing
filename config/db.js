const mongoose = require('mongoose');
require('dotenv').config();

// Get the connection string from your MongoDB Atlas dashboard
const MONGO_URI = process.env.MONGO_CONNECTION_URL;

// Connect to MongoDB
function connectDB(){

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const connection = mongoose.connection;

// Event listeners for database connection
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('Connected to the MongoDB database!');
});
}
module.exports=connectDB;