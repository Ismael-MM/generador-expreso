// Instanciaciones
var createError = require('http-errors');
var express = require('express');
var favicon = require('serve-favicon')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bicicletasAPIRouter = require('./routes/api/bicicletas');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// Fin Instanciaciones

//Configuraciones
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// fin Configuraciones

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/bicicletas', bicicletasAPIRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// fin rutas


// error handler Manejadores de errores
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// fin Manejadores de errores

module.exports = app;
