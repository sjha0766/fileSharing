const mongoose = require('mongoose');

// Define the schema
const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: false,
  },
  receiver: {
    type: String,
    required: false,
  }
},
 {timestamps:true});

// Create a Mongoose model using the schema
const File = mongoose.model('File', fileSchema);

// Export the model for use in other files
module.exports = File;
