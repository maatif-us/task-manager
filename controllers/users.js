const User = require('../models/User');

const getUsers = async (req, res, next) => {
  try {
    const user = await User.find().select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(400).json({ errors: [{ message: 'No such document exists for the given Id' }] })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  getUsers,
  getUser
}
