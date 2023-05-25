const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function (next) {
  const saltRound = 10
  const password = this.password

  const salt = await bcrypt.genSalt(saltRound)
  const hash = await bcrypt.hash(password, salt)

  this.password = hash
  next()
})

UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  const isPasswordValid = await bcrypt.compare(password, user.password)
  console.log('instance method isValidPassword ran: ' + isPasswordValid)

  return isPasswordValid
}

UserSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', UserSchema);
