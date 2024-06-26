const express = require('express');
const { 
  createProject, 
  getAllProjects, 
  checkProjectAccess, 
  getProject, 
  updateProject, 
  deleteProject,
  getDashboard} = require('../controllers/projectController');
const {getTicketsForProject, createTicket } = require('../controllers/ticketController');
const {auth} = require('../controllers/userController');
const router = express.Router();

router
.route('/')
.get(auth, getAllProjects)
.post(auth, createProject);

router
.route('/:id')
.get(auth, checkProjectAccess, getProject)
.put(auth, checkProjectAccess, updateProject)
.delete(auth, deleteProject);

router
.route('/:id/dashboard')
.get(auth, checkProjectAccess, getDashboard);

// router
// .route('/tickets')
// .get(auth, checkProjectAccess, getTicketsForProject)
// .post(auth, checkProjectAccess, createTicket);

router
.route('/:id/tickets')
.get(auth, checkProjectAccess, getTicketsForProject)
.post(auth, checkProjectAccess, createTicket);

// router
// .route('/:id/tickets/:ticketId')
// .get(auth, getTicket);
// .put(auth, updateTicket)
// .delete(auth, deleteTicket);

// router
// .route('/:id')
// .get(getUser);

module.exports = router;