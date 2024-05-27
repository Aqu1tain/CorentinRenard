import { Schema, model } from 'mongoose';

export const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  textid: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  sitetype: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    //default is current User, see User.js
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  updatedAt: {
    type: Date,
    default: () => new Date()
  },
  clientName: {
    type: String,
    required: false
  },
  clientComment: {
    type: String,
    required: false
  },
  projectLink : {
    type: String,
    required: true
  }
});

export const Post = model('Post', postSchema);