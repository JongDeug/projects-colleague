const express = require('express');
const app = express();
const { reqLogger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = 3500;


// buit-in middleware
app.use(express.urlencoded({ extended: false })); // true일 경우 qs 라이브러리 사용
app.use(express.json());

// custom middleware
app.use(reqLogger);

app.get('/', (req, res) => {
    res.status(200).send('hi');
});

// errorHandler, custom middleware
app.use(errorHandler); 

app.listen(PORT, () => console.log(`Server running on ${PORT} port`));