const mongoose = require('../config/db_connection');

const newsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  headline: {
    type: String,
  },
  news_content: {
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

module.exports = mongoose.model('news', newsSchema);
