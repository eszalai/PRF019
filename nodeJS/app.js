const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const cors = require('cors');

const dbUrl = "mongodb://localhost:27017";

app.set('dbUrl', dbUrl);

require('./src/models/user');
require('./src/models/challenge');

const userModel = mongoose.model('user');
const challengeModel = mongoose.model('challenge');
const testData = require('./src/data/test_data');

mongoose.connect(dbUrl);

mongoose.connection.on('connected', function() {
    console.log('db connected');
});

mongoose.connection.on('error', function() {
    console.log('db connection error');
});


passport.serializeUser(function(user, done) {
    if(!user) return done("serializalasi hiba", user);
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    if(!user) return done("serializalasi hiba", user);
    return done(null, user);
});

passport.use('local', 
    new localStrategy(function(username, password, done) {
        userModel.findOne({username: username}, function(err, user) {
            if(!user || err) return done("cannot get user", false);
            user.comparePasswords(password, function(err, isMatch) {
                if(err || !isMatch) return done("password incorrect", false);
                return done(null, user);
            });
        });
    }));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

app.use(expressSession({secret: '12354456462almajjimnhgiknb,'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/html-mastery', require('./src/routes/routes'));
app.use('/html-mastery/challenges', require('./src/routes/challenges'));

if(process.env.INIT_DATA) {
    testData.addChallenges();
    testData.addUsers();
}

app.listen(5000, function() {
    console.log('the server is running');
});

