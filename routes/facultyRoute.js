const express = require('express');
const path = require('path')

const router = express.Router()
const facultyController = require('../controllers/facultyController')
const studentController = require('../controllers/studentController');

router.get('/dashboard', (req, res) => {
    res.render('faculty/facultyDashboard.ejs')
})
router.get('/managestudent', (req, res) => {
    res.render('faculty/student/managestudent.ejs');
})
router.get('/searchstudent', facultyController.searchStudent)
router.get('/studenttable', facultyController.studentTable)
router.post('/markattendance', facultyController.markAttendance)
router.post('/submitattendance', facultyController.submitAttendance)



// -----------------------------------------POST Methods---------------------------
router.post('/markattendance', facultyController.markattendance);
router.post('/savemarkattendance', facultyController.savemarkattendance);


module.exports = router
