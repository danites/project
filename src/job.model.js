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
    },
    // prefered_date : { type : Date, default: Date.now },
    prefered_date : { type : Date},
    
});

var Job = mongoose.model('job', jobSchema);

module.exports = Job;