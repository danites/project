var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: Number,
    userName: String,
    profileImage: Blob,
    rating: [
            {
                idRating: Schema.ObjectId, 
                jobId: String,
                start: Number,
                comment: String,
                type: integer
            }
    ]
});

var User = mongoose.model('user', userSchema);

module.exports = User;