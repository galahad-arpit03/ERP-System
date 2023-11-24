const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "student",
    },
    dates: [
        {
            date: {
                type: Date,
                required: true,
            },
            attendance: {
                type: Number,
                required: true,

            },
        },
    ],
    classattended: {
        type: Number,
        default: 0
    },
    totalclass: {
        type: Number,
        default: 0
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
