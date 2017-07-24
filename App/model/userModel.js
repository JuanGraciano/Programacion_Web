var mongoose = require('mongoose');

//User Model
var userSchema = new mongoose.Schema({
  username: {
  	type: String 
  },
  password:  { 
  	type: String 
  },
  email:      {
  	type: String
  },
  token:    {
  	type: String, 
  	default: ''
  }
}, {collection: 'user'});

module.exports = mongoose.model('user', userSchema);
