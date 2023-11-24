const express = require('express');
const path = require('path')

const router = express.Router()
const adminController = require('../controllers/adminController')

// All Get Method
router.get('/dashboard', (req, res) => {
    username = req.cookies.erpUserName
    console.log(username);
    res.render('admin/adminDashboard.ejs', { username: username })
})
router.get('/managefaculty', adminController.manageFaculty)
router.get('/searchfaculty', adminController.searchFaculty)
router.get('/searchstudent', adminController.searchStudent)
router.get('/searchsubject', adminController.searchSubject)
router.get('/managestudent', adminController.manageStudent);
router.get('/facultytable', adminController.facultyTable);
router.get('/studenttable', adminController.studentTable);
router.get('/subjecttable', adminController.subjectTable);
router.get('/managesubject', adminController.manageSubject)
router.get('/gettgids', adminController.getTgids)


// All Post Method
router.post('/addfaculty', adminController.addFaculty);
router.post('/addstudent', adminController.addStudent);
router.post('/addsubject', adminController.addSubject);
router.post('/singlefaculty', adminController.singleFaculty)
router.post('/singlestudent', adminController.singleStudent)
router.post('/facultyeditdetails', adminController.facultyeditDetails)
router.post('/updatefaculty', adminController.updateFaculty)
router.post('/updatestudent', adminController.updateStudent)
router.post('/editstudentdetails', adminController.editStudentDetails)
router.post('/editsubjectdetails', adminController.editSubjectDetails)
router.post('/singlesubject', adminController.singleSubject)


// Already logged in check
router.get('/login', async (req, res, next) => {
    const token = req.erpLoggedin;
    if (!token) {
        return res.render('login.ejs', { errorMessage: null });
    }

    res.redirect('/admin/dashboard');

});
router.get('/singleStudent', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'singleStudent.html'))
})

module.exports = router;