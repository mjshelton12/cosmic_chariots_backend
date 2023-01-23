const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://mjshelton12:Password123@cosmic-cluster.wnatxoj.mongodb.net/Cosmic-Chariots?retryWrites=true&w=majority',
  
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;