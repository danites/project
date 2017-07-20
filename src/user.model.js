var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: String,
    userName: String,
    profileImage: { data: Buffer, contentType: String },
    rating: [
            { 
                jobId: String,
                start: Number,
                comment: String,
                type: Number
            }
    ]
});

var User = mongoose.model('user', userSchema);

module.exports = User;