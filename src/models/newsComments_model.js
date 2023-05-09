const mongoose = require('../config/db_connection');

const newsCommentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  news_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'news',
  },
  comments: {
    type: String,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, {timestamps: true},
);

module.exports = mongoose.model('news_comments', newsCommentSchema);
