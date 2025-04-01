var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var contectroutes = require('./routes/Contectroutes');
const DB = require('./DB/Conn');
var app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to the database
DB();

// Serve React build folder as static files
// Adjust the path to your React build folder (it should be 'client/build')
app.use(express.static(path.join(__dirname, './build')));

// Serve API routes
app.use('/user', contectroutes);

// Catch-all handler to send index.html from React build for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

// Catch 404 errors and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
