const mongoose = require('mongoose');

const Message = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rooms'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  textMessage: {
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model('messages', Message);