const mongoose = require('mongoose');

const Relationship = new mongoose.Schema(
  {
    firstUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    secondUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    status: {
      // 0	Pending
      // 1	Accepted
      // 2	Declined
      // 3	Blocked
      type: Number
    },
    actionUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('relationship', Relationship);
