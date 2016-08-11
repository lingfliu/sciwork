/*
 * A node.js based light weighted share and trading website for science researches
 * Copyrights by Lingfeng Liu, lingf.liu@gmail.com
 * Released under Apache license, see LICENSE for more details
 *
 * Technical stacks: express, redis session & cache, mongodb, REST, EJS, angular2
 */

//var favicon = require('serve-favicon');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//session
var session = require("express-session");
var RedisStore = require("connect-redis")(session);
var redis = require("redis");
var redis_cli_session = redis.createClient({
    host:'127.0.0.1',
    port:6379
});
redis_cli_session.on('error', function(err){
    //TODO: output to log
    console.log(err);
});

//routes
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

app.use(require('less-middleware')(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new RedisStore({
        client: redis_cli_session,

    }),
    secret: 'web2369b22f',
    resave: false,
    saveUninitialized: true,
    cookie:{
        path:'/',
        httpOnly:true,
        secure: false,
        maxAge: null
    }
}));

app.use(function(req, res, next){
    if(!req.session){
        return next(new Error('session lost'));
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);


/**********************************
 *404 error handling
 *********************************/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/* error handlers */
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
