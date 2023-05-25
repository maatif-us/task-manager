const { validationResult } = require("express-validator");

const validateResult = async(req,res,next)=>{
  const errors = validationResult(req);
  return !errors.isEmpty() ? res.status(400).json({ errors: errors.array() }) : next()
}

module.exports = validateResult
