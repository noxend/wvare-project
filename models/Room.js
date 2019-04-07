const mongoose = require('mongoose');

const Room = new mongoose.Schema({

  name: {
    type: String
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'messages'
  }]
}, { timestamps: true });

module.exports = mongoose.model('rooms', Room);