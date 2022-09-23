require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { reqLogger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verfiyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const corsOptions = require('./config/corsOptions');
const { default: mongoose } = require('mongoose');
const connectDB = require('./config/dbConn');
const { nextDay } = require("date-fns");
const PORT = 3500;

connectDB();

// middleware
app.use(express.urlencoded({ extended: false })); // true일 경우 qs 라이브러리 사용
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(reqLogger);

app.use(session({
    // secure: true,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        httpOnly: true,
        Secure: true
    },
    name: 'session-cookie'
}));


// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'index.html'));
});


app.use('/member', require('./routes/member'));
// get요청 처리
// app.get('/member/login/complete', (req, res) => {
//     console.log("hi");
//     res.send('hi');
//     // res.sendFile(path.join(__dirname, '/views', 'redirect.html'));
// })
// app.use(verfiyJWT);
// 여기부터 회원 api 작성 ...  


// // get요청 처리
// app.get('/member/login/complete', (req, res, next) => {
//     console.log("hi");
//     console.log("path.join(__dirname, '../../views', 'redirect.html')" + path.join(__dirname, '../../views', 'redirect.html'));

//     res.sendFile(path.join(__dirname, '/views', 'redirect.html'), (err) => {
//         if(err){
//             next(err);
//         }
//         else {
//             console.log('sent');
//         }
//     });
// })

// middleware
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
});