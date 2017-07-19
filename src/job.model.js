var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    userId: String,
    userName: String,
    name: String,
    description: String,
    category: String,
    // location: {
    //     city:String,
    //     state:String,
    //     zip:Number,
    //     long:Number,
    //     lat:Number
    // },
    location: {
        type: [Number, Number],  // [<longitude>, <latitude>]
        index: '2d'      // create the geospatial index
        // index: '2dsphere' // 
        },    
    preferred_date : { type : Date},
    hourly_fee: Number,
    candidates : [{
        userId : String,
        userName: String,
        applied_date : Date
     }],
    hired_user_id: String,
    hired_userName:String,
    ratingToEmp:Number,
    commentToEmp:String,
    ratingToSeeker:Number,
    commentToSeeker:String         
});

var Job = mongoose.model('job', jobSchema);

module.exports = Job;