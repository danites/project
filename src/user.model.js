var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    userId: Number,
    profileImage: Blob
});

var User = mongoose.model('user', userSchema);

module.exports = User;