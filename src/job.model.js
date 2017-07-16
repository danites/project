var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    name: String,
    weight: Number,
    age: Number
});

var Job = mongoose.model('job', jobSchema);

module.exports = Job;