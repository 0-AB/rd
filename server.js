
const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./config/db');
const path = require('path');

// Main
// Connection Call From ./config/db.js
connectDB();

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
