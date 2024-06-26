const express = require('express');

const {getAllTickets, 
       getTicket, 
       updateTicket, 
       deleteTicket, 
       createTicket } = require('../controllers/ticketController');
const {auth} = require('../controllers/userController');
const router = express.Router();

router
.route("/")
.get(auth, getAllTickets)
.post(auth, createTicket);

router
.route("/:id")
.get(auth, getTicket)
.put(auth, updateTicket)
.delete(auth, deleteTicket);

module.exports = router;
