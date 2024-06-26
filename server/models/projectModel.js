const { default: mongoose } = require("mongoose");
const {userSchema} = require("./userModel");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project must have a title']
  },
  description: {
    type: String,
    required: [true, 'Project must have a description'],
    maxLength: [300, 'Description must not be more than 300 characters long']
  },
  manager: {
    type: mongoose.Schema.ObjectId, 
    ref: 'User'
  },
  currentDevelopers: [
    { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User' 
    }
  ],
  last_update: {
    type: Date,
    default: new Date()
  },
  status: {
    type: String,
    enum: ['COMPLETED', 'ON HOLD', 'ONGOING'],
    default: 'ONGOING',
    required: true
  },
  tickets: [
    { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Ticket' 
    }
  ]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = {Project, projectSchema};