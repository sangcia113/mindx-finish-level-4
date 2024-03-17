require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected successfully to server...');
    } catch (error) {
        console.log('Connected error: ', error);
    }
};

module.exports = connectToDB;
