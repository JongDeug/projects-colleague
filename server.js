require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { reqLogger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verfiyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { default: mongoose } = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = 3500;

connectDB();

// buit-in middleware
app.use(express.urlencoded({ extended: false })); // true일 경우 qs 라이브러리 사용
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// custom middleware
app.use(reqLogger);

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'index.html'));
});
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use(verfiyJWT);

// 여기부터 회원 api 작성 ...  

// custom middleware, errorHandler
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
});