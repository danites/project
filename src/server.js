var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var jobs = require('./routes/jobs');
// var users = require('./routes/users');

var app = express();
app.set('port', (4267));

app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));
app.use('/bundle', express.static(__dirname + '/bundle'));
app.use('/app', express.static(__dirname + '/app'));
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

// app.use('/jobs', users);
// app.use('/users', users);

//Below is Enabling CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/swiftjob');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Job = require('./job.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    // select all Sorted by pref Date
    app.get('/jobs', function(req, res) {
        Job.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        })
        .sort({ prefered_date:1 });
    });

    // select all Sorted by pref Date, limit 10
    app.get('/jobssortlimit10', function(req, res) {
        console.log('get op:'+req);
        Job.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        })
        .sort({ prefered_date:1 })
        .limit(10);
    });

    // count all
    app.get('/jobs/count', function(req, res) {
        Job.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

    // create
    app.post('/job', function(req, res) {
        
        var obj = new Job(req.body);
        console.log('save op:'+req);
        //console.log('save op2:'+JSON.parse(obj));
        console.log('save op2:'+JSON.stringify(obj));
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find by id
    app.get('/job/:id', function(req, res) {
        Job.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    // Search filter
    app.get('/jobsearch', function(req, res) {
        var id = req.query
        Job.find({_id: req.params.id}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        })
        .sort({ prefered_date:1 });        
    });
    
    // update by id
    app.put('/job/:id', function(req, res) {
        Job.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/job/:id', function(req, res) {
        Job.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });


    //all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.listen(app.get('port'), function() {
        console.log('MEAN app listening on port '+app.get('port'));
    });
});


