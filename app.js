const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

//Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

// Listen to server
const port = 3000;
app.listen(port, () => console.log(`Server Up and running at http://localhost:${port}`));
