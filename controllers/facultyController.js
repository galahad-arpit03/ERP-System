const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');

const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

const student = require('../models/student')
const faculty = require('../models/faculty')
const Attendance = require('../models/attendance')




exports.login = async (req, res) => {
    console.log(req.body);
    email = req.body.username
    password = req.body.password
    console.log(email, password);

    try {
        const user = await faculty.findOne({ email: email })

        dbpass = user.password
        username = user.name
        bcrypt.compare(password, dbpass, function (err, result) {
            if (err) {
                console.error(err);
            } else if (result) {
                res.cookie('erpLoggedin', "Logged In", {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie('erpUser', "isFaculty", {
                    httpOnly: true,
                    secure: true,
                });


                res.cookie('erpUserName', username, {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie('tgid', user.tgid, {
                    httpOnly: true,
                    secure: true,
                });
                res.redirect('/faculty/dashboard')

            } else {
                console.log('Password is incorrect');
                res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/";</script>`);

            }
        });
    }
    catch (error) {
        res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/";</script>`);

        console.error('An error occurred:', error);
    }
}

exports.markattendance = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Student_Details')
            .select()
            .order('Enrollment_No', { ascending: true });



        if (error) {
            console.log(error);
        } else {
            console.log(data);
            res.render('faculty/markattendance.ejs', { Data: data })
        }

    } catch (error) {

    }
}

exports.savemarkattendance = async (req, res) => {
    console.log(req.body);
    res.send(req.body)
}


exports.searchStudent = async (req, res) => {
    const searchTerm = req.query.term;
    try {
        console.log(req.cookies.tgid + " " + searchTerm);
        const students = await student.find({
            tgid: req.cookies.tgid,
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
                { enrollment: { $regex: searchTerm, $options: 'i' } },
            ]
        })
        console.log(students);
        res.json(students)
    }
    catch {
        res.send(`<script>alert("Request failed. Try Again After Some Time"); window.location.href = "/faculty/managestudent";</script>`);

    }
}


exports.studentTable = async (req, res) => {
    console.log(req.cookies.tgid);
    try {
        const data = await student.find({ tgid: req.cookies.tgid }).sort('enrollment');
        console.log(data);

        res.render('faculty/student/studenttable', { Data: data });
    }
    catch {
        res.send(`<script>alert("Request failed. Try Again After Some Time"); window.location.href = "/faculty/managestudent";</script>`);


    }
}

exports.markAttendance = async (req, res) => {
    try {
        console.log("Date printing");
        // console.log(req.body.date);
        const dateExists = await Attendance.findOne({
            "dates.date": req.body.date,
        });
        // console.log(dateExists);

        if (dateExists) {
            console.log(`Attendance already marked for student with ID`);
            res.send(`<script>alert("Attendance Already marked for this date"); window.location.href = "/faculty/dashboard";</script>`);

        }
        else {
            req.session.date = req.body.date;
            // console.log(req.session.date);
            const data = await student.find({ tgid: req.cookies.tgid }).sort('enrollment');

            res.render('faculty/student/markattendance', { Data: data });
        }
    }
    catch {
        res.send(`<script>alert("Request failed. Try Again After Some Time"); window.location.href = "/faculty/managestudent";</script>`);

    }
}

exports.submitAttendance = async (req, res) => {
    try {

        const dataFromFrontend = req.body;
        let totalClasses = 0;

        const maxTotalClassDoc = await Attendance.findOne({})
            .sort({ totalclass: -1 })
            .exec();

        if (maxTotalClassDoc) {
            totalClasses = maxTotalClassDoc.totalclass + 1;
        } else {
            totalClasses = 1;
        }

        const updatePromises = [];

        for (const studentId in dataFromFrontend) {
            console.log(studentId);
            const attendanceStatus = dataFromFrontend[studentId];
            const classAttendedIncrement = attendanceStatus === "absent" ? 0 : 1;



            const updatePromise = Attendance.updateOne(
                { student: studentId },
                {
                    $push: {
                        dates: {
                            date: req.session.date,
                            attendance: attendanceStatus === "absent" ? 0 : 1,
                        },
                    },
                    $inc: { classattended: classAttendedIncrement },
                    $set: { totalclass: totalClasses },
                }
            );

            updatePromises.push(updatePromise);
        }

        await Promise.all(updatePromises);
        req.session.destroy();

        res.send(`<script>alert("Attendance Marked Successfully"); window.location.href = "/faculty/dashboard";</script>`);
    } catch (error) {
        console.error("An error occurred while processing attendance.");
        console.error(error);

        res.send(
            `<script>alert("Request failed. Try Again After Some Time"); window.location.href = "/faculty/managestudent";</script>`
        );
    }
};
