const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');

const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
const admin = require('../models/admin');
const faculty = require('../models/faculty')
const student = require('../models/student')
const subject = require('../models/subject')
const Attendance = require('../models/attendance')
// const asyncHandler = require("express-async-handler");

const login = async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        const user = await admin.findOne({ email: email });
        console.log(user);
        if (user) {
            const dbpass = user.password;
            const username = user.name;

            bcrypt.compare(password, dbpass, function (err, result) {
                if (err) {
                    console.error(err);
                } else if (result) {
                    res.cookie('erpLoggedin', 'Logged In', {
                        httpOnly: true,
                        secure: true,
                    });
                    res.cookie('erpUser', 'isAdmin', {
                        httpOnly: true,
                        secure: true,
                    });
                    res.cookie('erpUserName', username, {
                        httpOnly: true,
                        secure: true,
                    });
                    res.redirect('/admin/dashboard');
                } else {
                    console.log('Password is incorrect');
                    res.send('<script>alert("Login failed. Please check your credentials."); window.location.href = "/auth/admin/login";</script>');
                }
            });
        } else {
            console.log('User not found');
            res.send('<script>alert("Login failed. User not found."); window.location.href = "/auth/admin/login";</script>');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.send('<script>alert("Login failed. Please try again later."); window.location.href = "/auth/admin/login";</script>');
    }
};




const addFaculty = async (req, res) => {
    console.log(req.body);
    try {
        const originalTgid = req.body.tgid;
        const cleanedTgid = originalTgid.replace(/\s/g, '');
        const user = new faculty({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            qualifications: req.body.qualification,
            mobile: req.body.mobile,
            designation: req.body.designation,
            tgid: cleanedTgid,
            branch: req.body.branch,
            dob: req.body.dob
        })
        await user.save()
        res.send(`<script>alert("Faculty addeed successfully"); window.location.href = "/admin/dashboard";</script>`);

    }
    catch (e) {
        console.log("Error " + e);
        if (e.code === 11000) {

            res.send(`<script>alert("Request failed. Email Already Used"); window.location.href = "/admin/dashboard";</script>`);
        }
        else {
            res.send(`<script>alert("Request failed. Try Again After Some Time"); window.location.href = "/admin/dashboard";</script>`);

        }

    }
}
const manageFaculty = (req, res) => {
    res.render('admin/faculty/manageFaculty')
}
const singleFaculty = async (req, res) => {
    console.log(req.body.email);
    email = req.body.email
    try {
        const user = await faculty.findOne({ email: email })
        console.log(user);
        res.render('admin/faculty/singlefaculty', { d: user })

    } catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managestudent";</script>`);

    }
}

const searchFaculty = async (req, res) => {



    const searchTerm = req.query.term;

    try {
        const items = await faculty.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } }],
        });
        console.log(items);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const facultyTable = async (req, res) => {
    try {
        const data = await faculty.find({}).sort('name');
        console.log(data);
        res.render('admin/faculty/facultytable', { Data: data });
    }
    catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managefaculty";</script>`);

    }

}
const facultyeditDetails = async (req, res) => {
    console.log(req.body.id);
    id = req.body.id
    try {
        const user = await faculty.findOne({ _id: id })
        console.log(user);
        res.render('admin/faculty/editfacultydetails', { d: user })

    } catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managestudent";</script>`);

    }
}
const updateFaculty = async (req, res) => {
    console.log("balleeee ");
    console.log(req.body);
    try {
        const originalTgid = req.body.tgid;
        const cleanedTgid = originalTgid.replace(/\s/g, '');
        let user = await faculty.findOne({ _id: req.body.id })
        console.log("Oyrrrrrrr " + user);
        user.name = req.body.name
        user.email = req.body.email
        user.gender = req.body.gender
        user.qualifications = req.body.qualification
        user.mobile = req.body.mobile
        user.designation = req.body.designation
        user.branch = req.body.branch
        user.tgid = cleanedTgid
        user.dob = req.body.dob
        await user.save()
        res.send(`<script>alert("Changes Saved"); window.location.href = "/admin/managefaculty";</script>`);


    } catch (e) {
        console.log(e);
        res.send(`<script>alert("Try again after some time"); window.location.href = "/admin/managefaculty";</script>`);

    }
}




const manageStudent = (req, res) => {
    res.render('admin/student/manageStudent.ejs')
}

const addStudent = async (req, res) => {
    console.log(req.body);
    ;
    try {
        const originalTgid = req.body.tgid;
        const cleanedTgid = originalTgid.replace(/\s/g, '')
        const user = new student({
            name: req.body.name,
            enrollment: req.body.enrollment,
            email: req.body.email,
            gender: req.body.gender,
            mobile: req.body.mobile,
            branch: req.body.branch,
            programme: req.body.programme,
            guardianMobile: req.body.guardianMobile,
            guardianName: req.body.guardianName,
            tgid: cleanedTgid,
            cgpa: req.body.cgpa,
            dob: req.body.dob
        })
        await user.save();
        const attend = new Attendance({
            student: user._id
        })
        attend.save();
        res.send(`<script>alert("Student addeed successfully"); window.location.href = "/admin/dashboard";</script>`);

    }
    catch (e) {
        console.log("Error " + e);
        if (e.code === 11000) {

            res.send(`<script>alert("Request failed. Email Already Used"); window.location.href = "/admin/dashboard";</script>`);
        }
        else {
            res.send(`<script>alert("Request failed. Try Again After Some Time"); window.location.href = "/admin/dashboard";</script>`);

        }

    }
}
const searchStudent = async (req, res) => {



    const searchTerm = req.query.term;

    try {
        const items = await student.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
                { enrollment: { $regex: searchTerm, $options: 'i' } }],
        });
        console.log(items);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const studentTable = async (req, res) => {
    try {
        const data = await student.find({}).sort('enrollment');
        console.log(data);
        res.render('admin/student/studenttable', { Data: data });
    }
    catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managestudent";</script>`);

    }
}

const singleStudent = async (req, res) => {
    console.log(req.body.email);
    email = req.body.email
    try {
        const user = await student.findOne({ email: email })
        console.log(user);
        res.render('admin/student/singlestudent', { d: user })

    } catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managestudent";</script>`);

    }
}

const editStudentDetails = async (req, res) => {
    console.log(req.body.id);
    id = req.body.id
    try {
        const user = await student.findOne({ _id: id })
        console.log(user);
        res.render('admin/student/editstudentdetails', { d: user })

    } catch {
        res.send(`<script>alert("Request failed. Please check after some time "); window.location.href = "/admin/managestudent";</script>`);

    }
}

const updateStudent = async (req, res) => {
    try {
        const originalTgid = req.body.tgid;
        const cleanedTgid = originalTgid.replace(/\s/g, '');
        const data = await student.findOne({ _id: req.body.id })
        data.name = req.body.name;
        data.enrollment = req.body.enrollment;
        data.email = req.body.email;
        data.gender = req.body.gender;
        data.mobile = req.body.mobile;
        data.branch = req.body.branch;
        data.programme = req.body.programme;
        data.guardianMobile = req.body.guardianMobile;
        data.guardianName = req.body.guardianName;
        data.cgpa = req.body.cgpa;
        data.tgid = cleanedTgid;
        data.dob = req.body.dob;
        await data.save()
        res.send(`<script>alert("Changes Saved"); window.location.href = "/admin/managestudent";</script>`);
    }
    catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managestudent";</script>`);

    }
}






// -----------------------------------Subject--------------------------------
const addSubject = async (req, res) => {
    console.log(req.body);
    try {
        const sub = new subject({
            name: req.body.name,
            code: req.body.code,
            semester: req.body.semester

        })
        await sub.save();
        res.send(`<script>alert("Subject added successfully"); window.location.href = "/admin/dashboard";</script>`);

    }
    catch (e) {
        console.log("Error " + e.code);
        if (e.code === 11000) {

            res.send(`<script>alert("Request failed. Subject Code Already Used"); window.location.href = "/admin/dashboard";</script>`);
        }
        else {
            res.send(`<script>alert("Request failed. Try Again After Some Time"); window.location.href = "/admin/dashboard";</script>`);

        }

    }
}
const manageSubject = async (req, res) => {
    res.render('admin/subject/manageSubject.ejs')

}
const searchSubject = async (req, res) => {
    const searchTerm = req.query.term;

    try {
        const items = await subject.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { code: { $regex: searchTerm, $options: 'i' } }],
        });
        console.log(items);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const subjectTable = async (req, res) => {
    try {
        const data = await subject.find({})
        console.log(data);
        res.render('admin/subject/subjecttable', { Data: data });
    }
    catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managesubject";</script>`);

    }
}

const singleSubject = async (req, res) => {
    try {
        const sub = await subject.findOne({ _id: req.body.id })
        console.log(sub);
        res.render("admin/subject/singlesubject.ejs", { d: sub })
    }
    catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managesubject";</script>`);

    }
}
const editSubjectDetails = async (req, res) => {
    try {
        const sub = await subject.findOne({ _id: req.body.id })
        console.log(sub);
        res.render("admin/subject/editsubjectdetails.ejs", { d: sub })
    }
    catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managesubject";</script>`);

    }
}
const updateSubject = async (req, res) => {
    try {
        const data = await subject.findOne({ _id: req.body.id })
        data.code = req.body.code;
        data.name = req.body.name;
        data.semester = req.body.semester
        data.save()
        res.send(`<script>alert("Changes saved in Subject"); window.location.href = "/admin/managesubject";</script>`);

    }
    catch {
        res.send(`<script>alert("Request failed. Please check after some time"); window.location.href = "/admin/managestudent";</script>`);

    }
}

const getTgids = async (req, res) => {
    try {
        console.log("Request Came");
        const uniqueTgids = await faculty.find().distinct('tgid');
        res.json(uniqueTgids);


    } catch {

    }
}

module.exports = {
    login,
    manageFaculty,
    searchFaculty,
    manageStudent,
    facultyTable,
    addFaculty,
    addStudent,
    searchStudent,
    studentTable,
    addSubject,
    manageSubject,
    searchSubject,
    subjectTable,
    facultyeditDetails,
    updateFaculty,
    singleFaculty,
    singleStudent,
    editStudentDetails,
    updateStudent,
    singleSubject,
    updateSubject,
    editSubjectDetails,
    getTgids,

}