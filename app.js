var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
var logger = require('morgan');
var nocache = require('nocache');
// var hbs = require('express-handlebars')
const Handlebars = require('handlebars');

Handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
});


// routes
var indexRouter = require('./routes/index');
var logoutRouter = require('./routes/logout');
var loginRouter = require('./routes/login');
var AdminLoginRouter = require('./routes/adlogin');
var AdminPageRouter = require('./routes/adminpage');
var AdminActionRouter = require('./routes/adminactions');
var createUserRouter = require('./routes/createuser');
var signupRouter = require('./routes/signup');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/',partialsDir:__dirname+'/views/partials/'}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(nocache());
app.use(session({
  secret: "xyz",
  saveUninitialized: false,
  resave:true,
  cookie: {
    sameSite: 'strict',
    maxAge:  60 * 1000 * 60
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/admin', AdminLoginRouter);
app.use('/adminpage', AdminPageRouter);
app.use('/adminaction', AdminActionRouter);
app.use('/createuser', createUserRouter);
app.use('/signup', signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
