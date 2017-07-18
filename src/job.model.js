var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    userId: String,
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
    // preferred_date : { type : Date, default: Date.now },
    location: {
        type: [Number, Number],  // [<longitude>, <latitude>]
        index: '2d'      // create the geospatial index
        // index: '2dsphere' // 
        },    
    preferred_date : { type : Date},
    hourly_fee: Number,
    candidates : [{
    userId : String,
    applied_date : Date
     }],
    hired_user_id: String,
    hired_userName:String
    
});

var Job = mongoose.model('job', jobSchema);

module.exports = Job;