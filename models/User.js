const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  imageSrc: {
    type: String
  },
  hashPass: {
    type: String,
    required: true
  },
  profileImageHeader: {
    type: Schema.Types.ObjectId,
    ref: 'uploads'
  },
  role: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
