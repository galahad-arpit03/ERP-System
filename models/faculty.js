const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        default: "$2b$10$16MsiFej61u3ULfsQzdeLuakUOZcAAFpMLL7QEDL40C0pJBR7WIKi"
    },
    mobile: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    tgid: {
        type: String,
        default: ""
    },
    dob: {
        type: String,
        required: true
    }
});

const Faculty = mongoose.model('faculty', userSchema);

module.exports = Faculty;
