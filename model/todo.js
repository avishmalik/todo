const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
    body: {type: String, required:true},
    time: {type: String,required: true},
    
});
// Date, default: Date.now()
module.exports = mongoose.model('Todo', todoSchema);