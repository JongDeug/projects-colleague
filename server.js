const express = require('express');
const app = express();


// buit-in middleware
app.use(express.urlencoded({ extended: false })); // true일 경우 qs 라이브러리 사용
app.use(express.json());