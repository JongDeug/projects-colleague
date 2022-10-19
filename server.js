require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { reqLogger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { default: mongoose } = require("mongoose");
const connectDB = require("./config/dbConn");
const crawler = require("./middleware/crawler");
const PORT = 3500;

connectDB();
// crawler(); // 주기랑 다시 설정해야함.

// middleware
app.use(express.urlencoded({ extended: false })); // true일 경우 qs 라이브러리 사용
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(reqLogger);

// serve static files
// <test>
app.use("/", express.static(path.join(__dirname, "/public")));
// <real>
app.use("/", express.static(path.join(__dirname, "React/build/")));

// <test>
// app.use('/', require('./routes/root_test'));


// <real> client-side redering (React에 전적으로 라우팅을 넘김) 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'React/build/index.html'));
});
app.use("/auth", require('./routes/auth')); 
app.use(verifyJWT);
app.use("/api/member", require("./routes/api/memberAPI"));
app.use("/api/board", require("./routes/api/boardAPI"));


// middleware
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
});


