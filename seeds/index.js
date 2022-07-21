const {time} = require('./dates');
const mongoose = require('mongoose');
const {places,descriptors}= require('./bodies');
const Todo = require('../model/todo');

mongoose.connect('mongodb://localhost:27017/todos',{
    useNewUrlParser: true,
    
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console, "Connection Error"));
db.once('open',()=>{
    console.log('Database connected')
})


const sample = array => array[Math.floor(Math.random()* array.length)] 

const seedDB = async ()=>{
    await Todo.deleteMany({})
    for(let i =0; i<10;i++){
        
        
        const todo = new Todo({
            body: `${sample(descriptors)} ${sample(places)}`, 
            time: `${sample(time)}`
            
        })
        await todo.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});