require('dotenv').config();
const connectToDB = require('./src/databases');
const express = require('express');
const cors = require('cors');
const route = require('./src/routes');
const app = express();
app.use(cors());
app.use(express.json());
connectToDB()
    .then(() => {
        app.use('/', route);
        const PORT = process.env.PORT || 4001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to database:', error);
    });
