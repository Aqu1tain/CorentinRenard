const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle User si besoin
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
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

module.exports = mongoose.model('Post', postSchema);