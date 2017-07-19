var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: Number,
    userName: String,
    profileImage: String,
    rating: [
            {
                jobId: String,
                jobName: String,
                star: Number,
                comment: String,
                type: Number
            }
    ]
});

var Users = mongoose.model('users', userSchema);

module.exports = Users;