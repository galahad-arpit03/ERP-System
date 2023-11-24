const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

// ------------Importing Routes---------------
const adminRoute = require('./routes/adminRoute');
const facultyRoute = require('./routes/facultyRoute');
const studentRoute = require('./routes/studentRoute');
const authMiddleware = require('./middleware/authMiddleware');
const markedAttendance = require('./controllers/markedAttendance');

const app = express();

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Session configuration
app.use(session({
    secret: 'abhinav',
    resave: false,
    saveUninitialized: false,
    // Add a store configuration if needed
    // store: yourSessionStore,
}));

app.set('view engine', 'ejs');

app.get('/marking', markedAttendance);

app.use('/auth', authMiddleware.router);

app.use('/admin', authMiddleware.isAdmin, adminRoute);
app.use('/faculty', authMiddleware.isFaculty, facultyRoute);
app.use('/student', authMiddleware.isStudent, studentRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'html', '404.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`);
});




// const plaintextPassword = 'password';

// const saltRounds = 10;
// bcrypt.genSalt(saltRounds, function (err, salt) {
//     if (err) {
//         console.error(err);
//     } else {
//         bcrypt.hash(plaintextPassword, salt, function (err, hash) {
//             if (err) {
//                 console.error(err);
//             } else {
//                 console.log('Hashed Password:', hash);
//             }
//         });
//     }
// })
// $2b$10$16MsiFej61u3ULfsQzdeLuakUOZcAAFpMLL7QEDL40C0pJBR7WIKi