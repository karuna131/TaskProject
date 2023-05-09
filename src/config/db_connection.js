const mongoose = require('mongoose');
const config = require('./config.json');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.dbConnection_url, connectionOptions);

module.exports = mongoose;
