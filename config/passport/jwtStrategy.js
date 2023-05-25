const passportJWT =  require('passport-jwt')
const User = require('../../models/User');


const ExtractJwt = passportJWT.ExtractJwt
const JWTstrategy = passportJWT.Strategy

const JWTpassport = new JWTstrategy(
  {
    secretOrKey: process.env.TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
    passReqToCallback: true
  },
  async (req, token, done) => {
    try {
      const user = await User.findById(token.user.id)
      if (user) {
        req.user = user
        return done(null, user)
      }
      return done(null, false, { message: 'Invalid user token' })
    } catch (err) {
      return done(err)
    }
  }
)

module.exports = JWTpassport
