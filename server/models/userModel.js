const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
      type: String,
      required: [true, "Please provide full name of user"]
  },
  lastName: {
      type: String,
      required: [true, "Please provide full name of user"]
  },
  userName: {
      type: String,
      required: [true,  "User must have an unique username"],
      unique: [true, "Sorry! This username already exists"]
  },
  password: {
      type: String,
      required: [true, 'Please provide a password']
  },
  role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "DEVELOPER"],
      required: true
  },
  currentProjects: [
      { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Project'
      }
  ],
  assignedTickets: [
      { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Ticket'
      }
  ],
  joinDate: {
    type: Date,
    default: new Date(),
    required: true
  },
  lastLogin: {
      type: Date
  },
  accountDeactivated: Date,
  status: {
      type: String,
      enum: ['LOGGED IN', 'LOGGED OUT', 'DEACTIVATED'],
      default: 'LOGGED OUT'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};
