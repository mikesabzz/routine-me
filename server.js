const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')

const authRouter = require('./router/authRouter')
const appRouter = require('./router/appRouter')
const { authorized } = require('./auth/auth')
const passport = require('passport')
require('dotenv').config()

// establishing the I/O port
const PORT = process.env.PORT || 4567
// initializing the express app
const app = express()
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 204,
};

// configure middleware
app.use(cors(corsOptions))
app.use(logger('dev'))
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
// Static hosting for built files
app.use('/auth', authRouter)
app.use('/app',  authorized, appRouter) // to reactive security
app.use(passport.initialize())

app.get('/', async (request, response) => {
  try {
    response.sendFile(path.join(__dirname, './client/build', 'index.html'));
    // response.json({message: 'Welcome to Express Auth App!'})
  } catch (e) {
    response.status(e.status).json({ message: e.status }) 
  }
})
app.get('/error', function(req, res){
  res.render('error.html');
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message})
})
app.use(express.static(path.join(__dirname, './client/build')));

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
// if (process.env.NODE_ENV == "production") {
// if (process.env.NODE_ENV == "development") {
//   app.use('*', (req, res) => res.sendFile(path.join(__dirname, './client/build', "index.html")));
// }

/*
// Generic error handler
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}*/

 app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))

 module.exports = app;
