var mongoose = require('mongoose');

var LocationSchema = mongoose.Schema({  
    name: String,
    loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
    }
});

var Location = mongoose.model('location', LocationSchema);

module.exports = location;