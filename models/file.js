const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Files
const fileSchema = new Schema({
 filename: { type: String, require: true },
 path: { type: String, require: true },
 size: { type: Number, require: true },
 uuid: { type: String, require: true },
 sender: { type: String, require: false },
 receiver: { type: String, require: false }
}, { timestamps: true});

// Model export 
module.exports =mongoose.model('File', fileSchema);
