const express = require('express');
const { 
  getAllUsers, 
  createUser, 
  getUser, 
  updateUser,
  deleteUser,
  login, 
  logout, 
  auth, 
  getDashboard } = require('../controllers/userController');
const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(auth, getUser)
  // .put(auth, updateUser)
  .delete(auth, deleteUser);

router
.route('/:id/dashboard')
.get(auth, getDashboard);

// router
// .route("/:id/dashboard")
// .get(getDashboard)

router
  .route('/login')
  .post(login);

router
  .route('/logout')
  .post(logout);

module.exports = router;