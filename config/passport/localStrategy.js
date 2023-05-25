const passportLocal = require('passport-local')
const User = require('../../models/User');

const LocalStrategy = passportLocal.Strategy

const localStrategyLogin = new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    // verify function as per documentation
    const user = await User.findOne({ email })
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }
    try {
      const isPasswordValid = await user.isValidPassword(password)
      if (!isPasswordValid) {
        return done(null, false, { message: "password didn't match" })
      } else {
        console.log('login successful')
        return done(null, { id: user.id, name: user.name, email: user.email }, { message: 'logged in successfully' })
      }
    } catch (error) {
      done(error)
    }
  }
)

module.exports = localStrategyLogin
