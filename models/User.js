const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'uploads'
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
    },
    color: {
      type: String
    },
    ownPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'posts'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
