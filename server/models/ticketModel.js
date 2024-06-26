const { default: mongoose } = require("mongoose");
const {projectSchema} = require("./projectModel");
const {User, userSchema} = require("./userModel");
const {Project} = require("./projectModel");

const ticketSchema = mongoose.Schema({
  title: {
      type: String,
      required: [true, 'A ticket must have a title'],
      maxLength: [100, 'Title too long! Please restrict to 100 words or less']
  },
  description: {
      type: String,
      required: [true, "A ticket must have a description"],
      maxLength: [500, "Description too long! Please restrict to 500 words or less"]
  },
  project: {
    type: mongoose.Schema.ObjectId, 
      ref: 'Project'
  },
  assignedDeveloper: {
    type: mongoose.Schema.ObjectId, 
    ref: 'User'
  },
  last_updated: {
    type: Date,
    default: new Date()
  },
  priority: {
    type: String,
    enum: ["HIGH", "MEDIUM", "LOW"],
    required: [true, "Ticket must be assigned a priority"]
  },
  status: {
    type: String,
    enum: ["COMPLETED", "ON HOLD", "ONGOING"],
    default: "ONGOING"
  }
});

// function removeLinkedDocuments(doc) {
//   User.remove({_id: { $in: doc.assignedTickets }});
//   Project.remove({_id: { $in: doc.tickets }});
// }

// ticketSchema.pre('findOneAndDelete', removeLinkedDocuments);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = {Ticket, ticketSchema};
