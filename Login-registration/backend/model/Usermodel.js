const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Userschema = new mongoose.Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, requires: true }
})

Userschema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

module.exports = mongoose.model('users', Userschema)