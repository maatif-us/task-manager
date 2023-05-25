const User = require("../models/User");
const jwt = require('jsonwebtoken');

const signUp =  async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = await User.create({ name, email, password });

    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    next(error)
  }
}

const login = async (req, res, next) => {

  try {
    const payload = {
      user: {
        id: req.user.id
      }
    };
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    next(error)
  }
}


module.exports = {
  signUp,
  login
}
