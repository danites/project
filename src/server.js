var express = require('express');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');
var vm = require('js-vm');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//var Buffer =require('buffer');
// var jobs = require('./routes/jobs');
// var users = require('./routes/users');

var app = express();
app.set('port', (4267));
app.use(cors());

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
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, longtitude, latitude, sender_userId, sender_userName");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dani-23.auth0.com/.well-known/jwks.json"
    }),
    audience: 'dani-23.com',
    issuer: "https://dani-23.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/', function (req, res) {

    app.use('/', express.static(__dirname + '/public'));

    res.json(users);
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/swiftjob');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Job = require('./job.model.js');
var User = require('./user.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');


    // select all Sorted by pref Date
    app.get('/jobs', function (req, res) {
        Job.find({}, function (err, docs) {
            if (err) return console.error(err);
            res.json(docs);
        })
            .sort({ preferred_date: 1 });
    });

    // select all Sorted by pref Date, only from today to future
    app.get('/jobstoday', function (req, res) {
      
        Job.find({ "preferred_date": { "$gte": Date.now() },"hired_user_id": {$eq : null} }, function (err, docs) {
            if (err) return console.error(err);

            res.json(docs);
        })
            .sort({ preferred_date: 1 })
            .limit(10);;
    });

    // select all Sorted by pref Date, limit 10, only from today to future
    app.get('/jobstodaylimit10', function (req, res) {
        console.log('get op:' + req);
        Job.find({ "preferred_date": { "$gte": Date.now() } }, function (err, docs) {
            if (err) return console.error(err);
            res.json(docs);
        })
            .sort({ preferred_date: 1 })
            .limit(10);
    });

    // select all Sorted by pref Date, limit 10, only from today to future, nearest on Map
    app.get('/jobstodaynearlimit10', function (req, res) {
        var coords = [];
        //console.log(req.headers);
        coords[0] = req.get('longtitude') || 0;
        coords[1] = req.get('latitude') || 0;
        maxDistance = 10;
        console.log("coords jobstodaynearlimit10:" + coords[0] + ' ' + coords[1]);
        //Job.find({"preferred_date": {"$gte": Date.now()}}, function(err, docs) {
        Job.find({
            location: {
                $near: coords,
                //$maxDistance: maxDistance
            },"preferred_date": { "$gte": Date.now() },"hired_user_id": {$eq : null} 
        }, function (err, docs) {
            if (err) return console.error(err);
            res.json(docs);
        })
            .sort({ preferred_date: 1 })
            .limit(10);
    });

    // count all

    // app.get('/jobs/count', authCheck,function(req, res) {
    app.get('/jobs/count', function (req, res) {
        Job.count(function (err, count) {
            if (err) return console.error(err);
            res.json(count);
        });
    });

    // create
    // app.post('/job',authCheck, function(req, res) {
    app.post('/jobadd', function (req, res) {
        var obj = new Job(req.body);

        console.log("jobAdd Server 22"+JSON.stringify(obj));
        obj.save(function (err, obj) {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find Job by id
    app.get('/job/:id', function (req, res) {
        Job.findOne({ _id: req.params.id }, function (err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        })
    });

    app.get('/jobsByUser/:id', function (req, res) {
        //db.jobs.find({"candidates.userId":{$eq:"google-oauth2|104225564315616177259"}}).pretty()
        let qq = String(req.params.id);

        Job.find({ "candidates.userId": qq, "hired_user_id": {$eq : null}}, function (err, obj) {
            if (err) return console.error(err);

            res.json(obj);
        })
    });

    // Jobs Hired For JobSeeker
    app.get('/getJobsHiredOfSeeker/:id', function (req, res) {
        let qq = String(req.params.id);

        Job.find({"hired_user_id": qq}, function (err, obj) {
            if (err) return console.error(err);

            res.json(obj);
        })
    });

    // Search filter
    // app.get('/jobsearch',authCheck, function(req, res) {
    app.get('/jobsearch', function (req, res) {

        var query = req.query;
        console.log("Query is:" + query.category);
        var searchTerm = {"preferred_date": { "$gte": Date.now() },"hired_user_id": {$eq : null}};
        if (query.category) {
            searchTerm['category'] = {'$regex':query.category};
        }

        maxDistance = 10;

        if (query.hourly_fee) {
            searchTerm['hourly_fee'] = { "$gte": query.hourly_fee };
        }


        var coords = [];
        var coords = [];
        coords[0] = req.get('longtitude') || 0;
        coords[1] = req.get('latitude') || 0;
        
        console.log("jobsearch Coords:" + coords[0] + ' ' + coords[1]);
        
        if(query.category && query.hourly_fee){
            console.log('2 conditions');
            return Job.find({            
                location: {
                    $near: coords,
                    //$maxDistance: maxDistance
                },
                category: {'$regex':query.category, '$options' : 'i'}, hourly_fee:  { "$gte": query.hourly_fee },
                preferred_date: { "$gte": Date.now() },"hired_user_id": {$eq : null}
                }, function (err, docs) {
                if (err) return console.error(err);
                res.json(docs);
            })
            .sort({ preferred_date: 1 })
            .limit(10);
        }
        else {
            console.log('1 condition');
            if (query.category) {
                return Job.find({                
                        location: {
                            $near: coords,
                            //$maxDistance: maxDistance
                        },
                        category: {'$regex':query.category, '$options' : 'i'},
                        preferred_date: { "$gte": Date.now() },"hired_user_id": {$eq : null}
                        }, function (err, docs) {
                        if (err) return console.error(err);
                        res.json(docs);
                    })
                        .sort({ preferred_date: 1 })
                        .limit(10);;
                }

            else if(query.hourly_fee) {
                return Job.find({                
                        location: {
                            $near: coords,
                            //$maxDistance: maxDistance
                        },
                        hourly_fee:  { "$gte": query.hourly_fee },
                        preferred_date: { "$gte": Date.now() },"hired_user_id": {$eq : null}
                        }, function (err, docs) {
                        if (err) return console.error(err);
                        res.json(docs);
                    })
                        .sort({ preferred_date: 1 })
                        .limit(10);;
                }

            else {
                return Job.find({                
                        location: {
                            $near: coords,
                            //$maxDistance: maxDistance
                        },
                        preferred_date: { "$gte": Date.now() },"hired_user_id": {$eq : null}
                        }, function (err, docs) {
                        if (err) return console.error(err);
                        res.json(docs);
                    })
                        .sort({ preferred_date: 1 })
                        .limit(10);;
                }
            }
    });

    // update by id
    app.put('/job/:id', function (req, res) {
        Job.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // Apply for job
    app.put('/jobapply/:id', function (req, res) {
        let sender_userId = req.get('sender_userId');
        let sender_userName = req.get('sender_userName');

        Job.findOne({ _id: req.params.id }, function (err, job) {
            if (err) return console.error(err);
            //console.log('found:'+JSON.stringify(job));
            if (!job['candidates'])
                job['candidates'] = [];


            for (var i = 0; i < job['candidates'].length; i++) {
                if (job['candidates'][i].userId == sender_userId) {
                    return res.sendStatus(200);
                }
            }

            job['candidates'].push({
                userId: sender_userId,
                userName: sender_userName,
                applied_date: Date.now()
            });

            Job.findOneAndUpdate({ _id: req.params.id }, job, function (err) {
                if (err) return console.error(err);
                res.sendStatus(200);
            })

        })

    });

    // Jobs by Posted User
    app.get('/jobsPostedByUser/:id', function (req, res) {
        let id = String(req.params.id);

        Job.find({ "userId": id, "hired_user_id" : {$eq: null} }, function (err, obj) {
            if (err) return console.error(err);

            res.json(obj);
        })
    });


    // Hired Jobs by Employer
    app.get('/getJobsHiredByEmp/:id', function (req, res) {
        let id = String(req.params.id);
        console.log('getJobsHiredByEmp param:'+id);
        // 
        Job.find({"userId": id, "hired_user_id" : {$ne: null} }, function (err, obj) {
            if (err) return console.error(err);

            res.json(obj);
        })
    });

    // Candidates by Post Id
    app.get('/getcandidatesbyjob/:id', function (req, res) {
        let id = String(req.params.id);

        Job.findOne({ _id: id }, function (err, obj) {
            if (err) return console.error(err);

            res.json(obj);
        })
    });

    // Hiring candidate
    app.put('/hireCandidate/:id', function (req, res) {
        Job.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // Rating user
    app.put('/hireCandidate/:id', function (req, res) {
        Job.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/job/:id', function (req, res) {
        Job.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });


    app.post('/useradd', function (req, res) {

        console.log('useradd in Server');
        var obj = new User(req.body);

        console.log("userAdd Server:"+JSON.stringify(obj));
        obj.save(function (err, obj) {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find User by id
    app.get('/usersearch', function (req, res) {
        let param = req.get('sender_userId');
        console.log('user search param:'+param);
        // req.get('sender_userId');
        User.findOne({ userId: param }, function (err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        })
    });


    //all other routes are handled by Angular
    app.get('/*', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.listen(app.get('port'), function () {
        console.log('MEAN app listening on port ' + app.get('port'));
    });
});
