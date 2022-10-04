require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { reqLogger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const cors = require('cors');
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


// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/member', require('./routes/member'));
app.use(verifyJWT);
app.use('/api', require('./routes/api/getInfo'));


// middleware
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
});