
const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./config/db');
// Main
// Connection Call From ./config/db.js
connectDB();
// Routes
app.use('/api/files', require('./routes/files'))

//Port
app.listen(port, () => {
  console.log(`Listen Port ${port}`)
})
