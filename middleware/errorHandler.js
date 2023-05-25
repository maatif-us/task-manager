
const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ errorMessage: err.message, errors: err })
}

module.exports = errorHandler
