const { User } = require("../models/userModel");
const { Project } = require("../models/projectModel");
const { Ticket } = require("../models/ticketModel");
const { deleteOne } = require("../utils/methods");

exports.getAllProjects = async (req, res) => {
  try {
    // const userId = req.params.id;

    // if(!userId) {
    //   if(!req.user) {
    //     return res.status(401).json({
    //       status: 'error',
    //       message: 'You are not logged in'
    //     });
    //   } else {
    //     const user = req.user;
    //     if(user.role === 'ADMIN') {
    //       const projects = await Project.find();
    //       return res.status(200).json({
    //         status: 'success',
    //         data: projects
    //       });
    //     } else {
    //       return res.status(401).json({
    //         status: 'error',
    //         message: 'You are not authorized for this endpoint'
    //       })
    //     }
    //   }
    // } else {
    //   const user = User.findById(userId);
    //   const projects = Project.find({$or: [{manager: user}, {currentDevelopers: user._id}]});
    //   res.status(200).json({
    //     status: 'success',
    //     length: projects.length,
    //     data: projects
    //   });
    // }

    const currentUser = req.user;
    const populateManager = {
      path: "manager",
      select: "firstName lastName status",
    };
    const populateDevs = {
      path: "currentDevelopers",
      select: "firstName lastName status",
    };

    if (currentUser) {
      let query;
      if (currentUser.role === "ADMIN") {
        query = Project.find();
      } else if (currentUser.role === "MANAGER") {
        query = Project.find({
          $or: [
            { manager: currentUser._id },
            { currentDevelopers: currentUser._id },
          ],
        });
      } else if (currentUser.role === "DEVELOPER") {
        query = Project.find({ currentDevelopers: currentUser._id });
      }

      const projects = await query
        .populate(populateDevs)
        .populate(populateManager);

      return res.status(200).json({
        status: "success",
        data: projects,
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "You are not logged in",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    const currentUser = req.user;

    if (currentUser.role === "ADMIN" || currentUser.role === "MANAGER") {
      const project = new Project(req.body);
      const savedProject = await project.save();
      res.status(200).json({
        message: "Project created successfully",
        project: savedProject,
      });
    } else {
      res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.checkProjectAccess = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const projectId = req.params.id;

    const query = Project.findById(projectId);
    const populateManager = {
      path: "manager",
      select: "firstName lastName status",
    };
    const populateDevs = {
      path: "currentDevelopers",
      select: "firstName lastName status",
    };

    const project = await query
      .populate(populateDevs)
      .populate(populateManager);
    const isDeveloper = project.currentDevelopers.some((dev) =>
      dev._id.equals(currentUser._id),
    );

    if (
      !(
        currentUser.role === "ADMIN" ||
        project.manager._id.equals(currentUser._id) ||
        isDeveloper
      )
    ) {
      return res.status(401).json({
        status: "error",
        message:
          "This project does not belong to you. You cannot access or modify it",
      });
    }

    // console.log(project);
    req.project = project;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    // const currentUser = req.user;

    // const projectId = req.params.id;

    // const query = Project.findById(projectId);
    // const populateManager = {path: 'manager', select: 'firstName lastName status'};
    // const populateDevs = {path: 'currentDevelopers', select: 'firstName lastName status'};

    // const project = await query.populate(populateDevs).populate(populateManager);

    // console.log(project.manager._id + " " + currentUser._id + " " + (project.manager._id === currentUser._id));
    // console.log(typeof currentUser._id);
    // console.log(typeof project.manager._id);

    // if(currentUser.role === 'ADMIN'
    //    || project.manager._id.equals(currentUser._id)
    //    || project.currentDevelopers.filter(dev => !dev._id.equals(currentUser._id)).length !== 0
    // ) {
    //   return res.status(200).json({
    //     status: 'success',
    //     data: project
    //   });
    // } else {
    //   return res.status(401).json({
    //     status: 'error',
    //     message: 'This project does not belong to you. You cannot access it'
    //   });
    // }

    const project = req.project;

    return res.status(200).json({
      status: "success",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    console.log(req.body + " " + req.params.id);

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, last_update: new Date() },
      { new: true, runValidators: true },
    );

    if (
      updatedProject.manager._id.equals(req.user._id) ||
      req.user.role === "ADMIN"
    ) {
      return res.status(200).json({
        status: "success",
        message: "Project updated successfully",
        data: updatedProject,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message:
          "Project updated successfully... and your access to project has been revoked",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteProject = deleteOne(Project);

exports.getDashboard = async (req, res) => {
  try {
    const currentProject = req.project;

    // console.log(currentProject);

    const totalTickets = await Ticket.countDocuments({ project: currentProject._id });
    const completedTickets = await Ticket.countDocuments({
      project: currentProject._id,
      status: "COMPLETED",
    });

    // console.log(totalTickets + " " + completedTickets);

    const output = {
      title: currentProject.title,
      status: currentProject.status,
      manager: currentProject.manager.firstName + " " + currentProject.manager.lastName,
      numberOfDevelopers: currentProject.currentDevelopers.length,
      completionPercentage: (completedTickets/totalTickets) * 100 + "%"
    };

    const ticketsByPriority = await Ticket.aggregate([
      {
        $match: {
          project: currentProject._id,
        },
      },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 }
        },
      },
    ]);

    const countTicketsByStatus = await Ticket.aggregate([
      {
        $match: {
          project: currentProject._id,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        },
      },
    ]);

    const countTicketsByDeveloper = await Ticket.aggregate([
      {
        $match: {
          project: currentProject._id,
        },
      },
      {
        $group: {
          _id: "$assignedDeveloper",
          count: { $sum: 1 }
        },
      },
    ]);

    output.ticketCountByPriority = ticketsByPriority;
    output.ticketCountByStatus = countTicketsByStatus;
    output.ticketCountByDeveloper = countTicketsByDeveloper;

    res.status(200).json({
      status: "success",
      data: output,
    });
  } catch (err) {

    console.error(err);
    
    res.status(500).json({
      error: err,
    });
  }
};
