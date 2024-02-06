const mongoose = require('mongoose');
require('dotenv').config();




// Connect to MongoDB
function connectDB(){

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const connection = mongoose.connection;

// Event listeners for database connection
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('Connected to the MongoDB database!');
});
}
module.exports=connectDB;