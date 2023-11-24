const express = require('express');
const path = require('path')
const studentController = require('../controllers/studentController')
const router = express.Router()

router.get('/dashboard', studentController.dashboard);


module.exports = router;
