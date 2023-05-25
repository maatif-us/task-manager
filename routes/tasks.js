const express = require('express');
const taskRouter = express.Router();
const verifyToken = require('../middleware/auth');
const { getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks');

taskRouter
  .route('/')
  .get(verifyToken, getTask)
  .post(verifyToken, createTask)

taskRouter
  .route('/:id')
  .put(verifyToken, updateTask)
  .delete(verifyToken, deleteTask)

module.exports = taskRouter;
