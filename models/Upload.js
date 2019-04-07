
const mongoose = require('mongoose');

const Upload = new mongoose.Schema({
  path: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('uploads', Upload);