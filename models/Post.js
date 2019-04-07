const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  text: {
    type: String
  },
  imagePreview: {
    type: String
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    required: true,
    default: 'draft'
  },
  imageHeader: {
    type: Schema.Types.ObjectId,
    ref: 'uploads'
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        require: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('posts', PostSchema);
