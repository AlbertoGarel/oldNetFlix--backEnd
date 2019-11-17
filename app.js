//CONEXIÓN A MONGODB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('conectado a mongodb'))
    .catch(error => console.log('Error al conectar a MongoDB ' + error));
//---------
//IMPORTAMOS USERMODEL
// const UserModel = require('./models/User');
// const movieModel = require('./models/Movie');


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const pedidosRouter = require('./routes/pedidos');
// const generosRouter = require('./routes/generos');



var app = express();

//PARSEAMOS BODY
app.use(express.json()); //parseamos el body a json

//CREAMOS PETICIONES
// app.get('/user', (req, res) => {
//     UserModel.find({})
//         .then(users => res.send(users))
//         .catch(error => console.log(error))
// });

// app.post('/user/register', async (req, res) => {
//     try {
//         const user = await new UserModel({
//             username: req.body.username,
//             password: req.body.password
//         }).save();
//         res.send(user)
//     } catch (error) {
//         console.log(error);
//     }
// });

// app.patch('/user/:id', (req, res) => {
//     UserModel.findByIdAndUpdate(req.params.id, {
//         username: req.body.username
//     },{new:true,useFindAndModify:false})
//         .then(user=>res.send(user))
//         .catch(error=>console.log(error))
// });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/pedidos', pedidosRouter);

//ERROR
app.use((req, res, next)=>{
    res.send('error, no encontrado');
});

module.exports = app;
