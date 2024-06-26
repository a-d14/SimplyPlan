const { User } = require("../models/userModel");
const { getAll, getOne } = require("../utils/methods");
const { Project } = require("../models/projectModel");
const { Ticket } = require("../models/ticketModel");

let currentUsers = [];
let currentUser = null;

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    return res.status(200).json({
      status: "success",
      data: savedUser,
      message: "User created successfully"
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err
    });
  }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName + " " + password);

  const userLoggedIn = currentUsers.some(obj => obj.userName === userName);

  const user = await User.findOne({ userName, password });

  if(userLoggedIn) {
    currentUser = user;
    return res.status(401).json({
      message: "User already logged in"
    });
  }
  
  if(user) {

    user.lastLogin = new Date();
    user.status = 'LOGGED IN'

    await user.save();

    currentUsers.push(user);

    // console.log(currentUsers);

    currentUser = user;
    
    return res.status(200).json({
        status: "success",
        data: user
    });
    
  } else {
    return res.status(401).json({
        status: "failure",
        message: "Invalid credentials"
    });
  }
};

exports.auth = (req, res, next) => {
  if(!currentUser) {
    res.status(401).json({
        status: "failure",
        message: "Please log in to access this endpoint."
    });
  } else {
    req.user = currentUser;
    // console.log(currentUser);
    next();
  }
};

exports.logout = async (req, res) => {
  try {
    if(currentUser) {
      console.log("inside");
      currentUsers = currentUsers.filter(obj => obj.userName !== currentUser.userName);
      currentUser.status = 'LOGGED OUT';
      await currentUser.save();
      currentUser = currentUsers.length === 0 ? null : currentUsers[currentUsers.length - 1];
      return res.status(200).json({"status": "success", "message": "User logged out successfully"});
    } else {
      return res.status(401).json({
          status: "failure",
          message: "User not logged in"
      });
    }
  } catch(err) {
    return res.status(500).json({
        status: "failure",
        message: err
    });
  }
}

// exports.updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { req.body },
//       { new: true, runValidators: true },
//     );
    
//     return res.status(200).json({
//       status: "success",
//       message: "Project updated successfully",
//       data: updatedProject,
//     });
//   } catch(err) {
//     console.error(err);
//     return res.status(500).json({
//       status: "failure",
//       message: err
//     });
//   }
// };

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      status: "failure",
      message: err
    });
  }
}; 

exports.getDashboard = async (req, res) => {
  const user = await User.findById(req.params.id);
  getDashboardManager(user, res);
}

const getDashboardManager = async (user, res) => {
  try {

    const projectsManaging = await Project.find({manager: user._id});
    const projectsDeveloping = await Project.find({currentDevelopers: user._id});

    const output = {"numberOfProjectsManaging": projectsManaging.length, "projectsManaging": projectsManaging.map(project => project.title),     "numberOfProjectsDeveloping": projectsDeveloping.length, "projectsDeveloping": projectsDeveloping.map(project => project.title)};

    if(user.role === "MANAGER" || user.role === "ADMIN") {
      const projectProgressStatus = await Project.aggregate([
        {
          $match: {
           manager: user._id
          }
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          },
        }
      ]);

      const completionPercentage = (await Project.countDocuments({manager: user._id, status: "COMPLETED"}) / projectsManaging.length) * 100 + "%"

      output.projectProgressStatus = {projectProgressStatus, completionPercentage: completionPercentage};
    } else {
      const projectProgressStatus = await Project.aggregate([
        {
          $match: {
           currentDevelopers: user._id
          }
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          },
        }
      ]);

      const completionPercentage = (await Project.countDocuments({currentDevelopers: user._id, status: "COMPLETED"}) / projectsDeveloping.length) * 100 + "%"

      output.projectProgressStatus = {projectProgressStatus, completionPercentage: completionPercentage};
    }


    if(user.role === "MANAGER" || user.role === "ADMIN") {
      const ticketAssignment = {}
      for(const project of projectsManaging) {
        const devs = project.currentDevelopers;
        // console.log(devs);
        for(const developer of devs) {
          const dev = await User.findById(developer);
          // console.log(dev.assignedTickets);
          const assignedActiveTickets = dev.assignedTickets.filter(async ticketId => {
            let ticket = await Ticket.findById(ticketId);
            return ticket.status === "ONGOING";
          });
          const devName = dev.firstName + " " + dev.lastName;
          if(ticketAssignment.hasOwnProperty(devName)) {
            ticketAssignment[devName] = ticketAssignment[devName] + assignedActiveTickets.length;
          } else {
            ticketAssignment[devName] = assignedActiveTickets.length;
          }
        }
      }
      output.ticketAssignments = ticketAssignment;  
    }

    const assignedOngoingTickets = (await Promise.all(user.assignedTickets.map(
      async ticketId => await Ticket.findById(ticketId)
    ))).filter(ticket => ticket.status === "ONGOING");

    

    // const assignedActiveTickets = user.assignedTickets.filter(async ticketId => {
    //   let ticket = await Ticket.findById(ticketId);
    //   return ticket.status === "ONGOING";
    // });

    // console.log(assignedActiveTickets);

    // for(const ticket of assignedActiveTickets) {
    //   const 
    // }
    
    console.log(assignedOngoingTickets);

    const pendingTickets = [];

    for(const ticket of assignedOngoingTickets) {
      pendingTickets.push({
        title: ticket.title,
        status: ticket.priority
      });
    }

    output.pendingTickets = pendingTickets;
    
    // console.log(projectsManaging);
    // console.log(projectsDeveloping);

    res.status(200).json({
      message: "success",
      data: output
    });
    
    
  } catch(err) {
    console.error(err);
    return res.status(500).json({
        status: "failure",
        message: err
    });
  }
};
