const express = require('express');
const { log } = require('../controllers/adminController');
// const {auth} = require('../controllers/userController');
const router = express.Router();

router
  .route('/')
  .get(log);

module.exports = router;