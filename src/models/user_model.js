const mongoose = require('../config/db_connection');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema);
