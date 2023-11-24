const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    enrollment: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        default: "$2b$10$16MsiFej61u3ULfsQzdeLuakUOZcAAFpMLL7QEDL40C0pJBR7WIKi"
    },
    guardianName: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    guardianMobile: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    programme: {
        type: String,
        required: true
    },

    tgid: {
        type: String,
        required: true
    },
    dob: String,
    cgpa: {
        type: Number,
        default: NaN
    }

});

const Students = mongoose.model('students', userSchema);

module.exports = Students;
