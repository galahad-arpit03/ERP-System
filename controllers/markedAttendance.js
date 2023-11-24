const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))


const markedAttendance = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Attendance')
            .select()
            .eq('Enrollment_no', '0187CS211006')

        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
            res.send(data)
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}

module.exports = markedAttendance