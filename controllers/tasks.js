const { handleQuerySort } = require('../helpers/handleQuerySort');
const Task = require('../models/Task');

const getTask = async (req, res, next) => {
  try {
    const sort = req.query.sort ? handleQuerySort(req.query.sort) : { createdAt: -1 }
    const skip =  req.query.skip ? req.query.skip : 0
    const limit =  req.query.limit ? req.query.limit : 10
    const tasks = await Task.find({ user: req.user.id }).populate("user", "name email").sort(sort).skip(skip).limit(limit);
    res.json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    next(error)
  }
}

const createTask = async (req, res, next) => {
  const { title, description, status, priority } = req.body;

  // Simple validation
  if (!title)
    return res.status(400).json({ success: false, message: 'Title is required' });

  try {
    const newTask = await Task.create({
      title,
      description: description || "",
      status: status || "pending",
      priority: priority || "low",
      user: req.user.id
    });

    res.json({ success: true, message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error(error);
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  const { title, description, status, priority } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: 'Title is required' });

  try {
    let updatedTask = {
      title,
      description: description || "",
      status: status || "pending",
      priority: priority || "low"
    };

    const taskUpdateCondition = { _id: req.params.id, user: req.user.id };

    updatedTask = await Task.findOneAndUpdate(taskUpdateCondition, updatedTask, { new: true });

    // User not authorised to update task or task not found
    if (!updatedTask)
      return res.status(401).json({
        success: false,
        message: 'Task not found or user not authorised'
      });

    res.json({
      success: true,
      message: 'Task updated',
      task: updatedTask
    });
  } catch (error) {
    console.error(error);
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const taskDeleteCondition = { _id: req.params.id, user: req.user.id };
    const deletedTask = await Task.findOneAndDelete(taskDeleteCondition);

    // User not authorised or task not found
    if (!deletedTask)
      return res.status(401).json({
        success: false,
        message: 'Task not found or user not authorised'
      });

    res.json({ success: true, task: deletedTask });
  } catch (error) {
    console.error(error);
    next(error)
  }
}

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask
}
