var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    userId: String,
    name: String,
    description: String,
    category: String,
    location: {
        city:String,
        state:String,
        zip:Number,
        long:Number,
        lat:Number
    }
});

var Job = mongoose.model('job', jobSchema);

module.exports = Job;