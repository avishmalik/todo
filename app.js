const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Todo = require("./model/todo")
const ejsMate = require('ejs-mate');
const methodoverride = require('method-override');
const {todoSchema} = require('./schemas.js');

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

// const ObjectID = require('mongoose').Types.ObjectId;

mongoose.connect('mongodb://localhost:27017/todos',{
    useNewUrlParser: true,
    
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console, "Connection Error"));
db.once('open',()=>{
    console.log('Database connected')
})

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodoverride('_method'));

const validateTodo = (req,res,next) => {
    const {error} = todoSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next();
    }
}



app.get('/',(req,res) => {
    res.render('home');
});

app.get('/yourtodo',catchAsync(async(req,res,next) => {
    const todos = await Todo.find({});
    res.render('posts/index',{todos});
}));

app.post('/yourtodo',validateTodo,catchAsync(async (req, res,next) => {
    const todo = new Todo(req.body.todo);
    await todo.save();
    res.redirect(`/yourtodo`)
}))

app.delete('/yourtodo/:id',catchAsync(async (req, res,next)=>{
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.redirect('/yourtodo');
}))

app.listen(3000, ()=>{
    console.log("Serving in PORT 3000");
});