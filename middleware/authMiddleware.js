const express = require('express');
const path = require('path');
const adminRoute = require('../routes/adminRoute')
const adminController = require('../controllers/adminController')
const studentController = require('../controllers/studentController')
const facultyController = require('../controllers/facultyController')


const router = express.Router();
const authController = require('../controllers/authController');

router.get('/admin/login', async (req, res) => {

    const token = req.cookies.erpLoggedin;
    const userR = req.cookies.erpUser;

    if (!token) {
        return res.render('admin/login.ejs', { errorMessage: null });
    }
    else if (userR == 'isAdmin') {
        res.redirect('/admin/dashboard');

    }
    else {
        let altUser;
        if (userR === "isFaculty") {
            altUser = "Faculty";
        }
        else {
            altUser = "Student"
        }
        res.send(`<script>alert("Login failed. Already Logged in with ${altUser} account"); window.location.href = "/";</script>`);

    }
})
router.get('/faculty/login', async (req, res) => {

    const token = req.cookies.erpLoggedin;
    const userR = req.cookies.erpUser;

    console.log("new token", token);
    if (!token) {
        return res.render('faculty/login.ejs', { errorMessage: null });
    }

    else if (userR == 'isFaculty') {
        res.redirect('/faculty/dashboard');

    }
    else {
        let altUser;
        if (userR === "isAdmin") {
            altUser = "Admin";
        }
        else {
            altUser = "Student"
        }
        res.send(`<script>alert("Login failed. Already Logged in with ${altUser} account"); window.location.href = "/";</script>`);

    }
})
router.get('/student/login', async (req, res) => {

    const token = req.cookies.erpLoggedin;
    const userR = req.cookies.erpUser;

    if (!token) {
        return res.render('student/login.ejs', { errorMessage: null });
    }

    else if (userR == 'isStudent') {
        res.redirect('/student/dashboard');

    }

    else {
        let altUser;
        if (userR === "isAdmin") {
            altUser = "Admin";
        }
        else {
            altUser = "Faculty"
        }
        res.send(`<script>alert("Login failed. Already Logged in with ${altUser} account"); window.location.href = "/";</script>`);


    }
})


router.post('/admin/login', adminController.login);
router.post('/faculty/login', facultyController.login);
router.post('/student/login', studentController.login);

router.get('/forgotPassword', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'forgotPassword.html'))
})


router.get('/logout', authController.logout);



const isAdmin = (req, res, next) => {
    const token = req.cookies.erpLoggedin;
    const userR = req.cookies.erpUser;
    console.log("is authenticated", token);
    console.log("is authenticated", userR);

    if (!token) {
        return res.redirect("/auth/login");
    }
    if (userR == 'isAdmin') {

        next();
    }
    else {
        res.status(404).sendFile(path.join(__dirname, '../public', 'html', '404.html'));
    }

};
const isFaculty = (req, res, next) => {
    const token = req.cookies.erpLoggedin;
    const userR = req.cookies.erpUser;
    console.log("is authenticated", token);
    console.log("is authenticated", userR);

    if (!token) {
        return res.redirect("/auth/login");
    }
    if (userR == 'isFaculty') {

        next();
    }
    else {
        res.status(404).sendFile(path.join(__dirname, '../public', 'html', '404.html'));
    }

};
const isStudent = (req, res, next) => {
    const token = req.cookies.erpLoggedin;
    const userR = req.cookies.erpUser;
    console.log("is authenticated", token);
    console.log("is authenticated", userR);

    if (!token) {
        return res.redirect("/auth/login");
    }
    if (userR == 'isStudent') {

        next();
    }
    else {
        res.status(404).sendFile(path.join(__dirname, '../public', 'html', '404.html'));
    }

};



module.exports = { router, isAdmin, isFaculty, isStudent };
