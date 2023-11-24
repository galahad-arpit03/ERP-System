const mongoose = require('mongoose');

const subject = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }

});

const Subjects = mongoose.model('subjects', subject);

module.exports = Subjects;
