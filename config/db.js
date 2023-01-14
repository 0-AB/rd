require('dotenv').config();
const mongoose = require('mongoose');
function connectDB() {
    // Database connection 🥳
 
    // error
 
    // amongoose.set('strictQuery', true)
  
    mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true  });
    const connection = mongoose.connection;
    

   mongoose.set("strictQuery", true);
    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    })
   
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;