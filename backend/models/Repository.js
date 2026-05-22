const mongoose = require('mongoose');

const RepositorySchema = new mongoose.Schema({
  userId: {
    type: String, // String to support both Mongoose ObjectId and Mock DB user IDs
    required: true
  },
  githubId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  htmlUrl: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'Unknown'
  },
  starsCount: {
    type: Number,
    default: 0
  },
  forksCount: {
    type: Number,
    default: 0
  },
  openIssuesCount: {
    type: Number,
    default: 0
  },
  connectedAt: {
    type: Date,
    default: Date.now
  }
});

// Avoid compile overwrite errors
module.exports = mongoose.models.Repository || mongoose.model('Repository', RepositorySchema);
