const {User} = require('../models/userModel');
const {Ticket} = require('../models/ticketModel');
const {Project} = require('../models/projectModel');
const {getAll, getOne} = require('../utils/methods');

exports.getAllTickets = getAll(Ticket);
exports.getTicket = getOne(Ticket);

exports.checkTicketAccess = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);
    const isManager = ticket.project.manager._id.equals(currentUser._id);
    const isDeveloper = ticket.assignedDeveloper._id.equals(currentUser._id);

    if(!(currentUser.role === 'ADMIN' 
       || isManager
       || isDeveloper
    )) {
      return res.status(401).json({
        status: 'error',
        message: 'This ticket does not belong to you. You cannot access or modify it'
      });
    }

    req.ticket = ticket;

    next();

  } catch(err) {
    res.status(500).json({
        error: err
    });
  }
}

exports.getTicketsForProject = async (req, res) => {
  try {
    const currentProject = req.project;

    let query = Ticket.find({project: currentProject._id});
    query = query.populate({path: 'project', select: 'title'}).populate({path: 'assignedDeveloper', select: 'firstName lastName'});

    const tickets = await query;

    return res.status(200).json({
      status: 'success',
      data: tickets
    });
    
  } catch(err) {
    res.status(500).json({
        error: err
    });
  }
}

exports.createTicket = async (req, res) => {
  try {
    const project = req.project;
    console.log(project);
    if(!req.body.project) req.body.project = project._id;
    if(!req.body.assignedDeveloper) req.body.assignedDeveloper = req.user._id;

    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();

    // console.log(project);
    // console.log(req.body);

    project.tickets.push(savedTicket._id);
    await project.save();

    const dev = await User.findById(req.body.assignedDeveloper);

    console.log(dev);

    dev.assignedTickets.push(savedTicket._id);
    await dev.save();
    // console.log(dev);

    return res.status(200).json({
      "status": "success",
      "data": savedTicket,
      "message": "Ticket created successfully"
    });
    
  } catch(err) {
    console.error(err);
    res.status(500).json({
        error: err
    });
  }
}

exports.updateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, {...req.body, "last_updated": new Date()}, {new: true, runValidators: true});
    res.status(200).json({
      status: "success",
      data: updatedTicket
    });
  } catch(err) {
    res.status(500).json({
        error: err
    })
  }
}

exports.deleteTicket = async (req, res) => {
  const ticketId = req.params.id;

  try {
    await Project.updateMany({ tickets:  req.params.id}, { $pull: { tickets: req.params.id }})
    await User.updateMany({ assignedTickets: req.params.id}, { $pull: { assignedTickets: req.params.id}});
    await Ticket.findOneAndDelete({_id: ticketId});
    res.status(200).json({
      message: "Ticket deleted successfully"
    })
  } catch(err) {
    console.error(err);
    res.status(500).json({
        error: err
    })
  }

  
};