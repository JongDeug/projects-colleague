const mongoose = require('mongoose');

const connectDB = () => {
    console.log(process.env.DATABASE_URI)
    try {
        mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: false
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;