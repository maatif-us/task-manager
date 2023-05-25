const passport = require('passport')

const JWTpassport = require('./passport/jwtStrategy.js')
const localStrategyLogin = require('./passport/localStrategy.js')

passport.use('login', localStrategyLogin)
passport.use(JWTpassport)

module.exports = passport
