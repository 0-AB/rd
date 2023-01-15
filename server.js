
const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
// Main
// Connection Call From ./config/db.js
connectDB();
// Activate JSON
app.use(express.json());
// cors
const corsOptions = {
  origin:  ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3001']
}

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }
// cors second code
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// main body part
app.use(cors(corsOptions))
// Template engine for ejs
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');
// Public Path define
app.use(express.static('public'));
app.use('/files/download', require('./routes/download'));

// Routes

app.use('/api/files', require('./routes/files'))
app.use('/files', require('./routes/show'))
//Port
app.listen(port, () => {
  console.log(`Listen Port ${port}`)
})
