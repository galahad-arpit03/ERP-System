const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
const bcrypt = require('bcrypt');

const logout = async function logout(req, res) {
    req.session.destroy();
    res.clearCookie('erpLoggedin');
    res.clearCookie('tgid');
    res.clearCookie('studentID');
    res.redirect('/');
    console.log("Logged Out !!!!");
}


module.exports = { logout }