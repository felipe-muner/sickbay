require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const hbs = require(process.env.PWD + '/helpers/handlebars.js')(exphbs)
const expressSession = require('express-session')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const Association = require(process.env.PWD + '/models/Association')
Association.init()

const index = require(process.env.PWD + '/routes/index')
const allocateNurse = require(process.env.PWD + '/routes/configuration/allocate-nurse')
const profile = require(process.env.PWD + '/routes/configuration/profile')
const medicationControlled = require(process.env.PWD + '/routes/medication-controlled')

const app = express()

app.use(helmet())

i18n.configure({
  locales: ['en', 'pt-BR'],
  defaultLocale: 'pt-BR',
  directory: process.env.PWD + '/locales',
  objectNotation: true,
  register: global
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressSession({
  secret: 'e2r3$r!q0oIl',
  saveUninitialized: false,
  resave: false,
  name: 'sick-bay'
}))

app.use('/', index)
app.use('/configuration/allocate-nurse', allocateNurse)
app.use('/configuration/profile', profile)
app.use('/medication-controlled', medicationControlled)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', {redirectUrl: req.originalUrl})
})

module.exports = app
