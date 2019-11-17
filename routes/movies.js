var express = require('express');
var router = express.Router();
// const axios = require('axios');
//ADD MODELS
const MovieModel = require('../models/Movie');
const GeneroModel = require('../models/Genero');
const EstrenosModel = require('../models/Estrenos');
//ADD MIDDLEWARE
const movieIdMiddleware = require('../middlewares/movieIdMiddleware');


//GET ALL
router.get('/', (req, res) => {
    MovieModel.find({})
        .then(movie => res.send(movie))
        .catch(error => console.log(error))
});

//GET MOVIE BY UPCOMMING
router.get('/estrenos', (req, res) => {
    EstrenosModel.find({})
        .then(estrenos => res.send(estrenos))
        .catch(error => console.log(error))
    // res.send('estas en estrenos')
});

//GET MOVIE BY ID
router.get('/:id', movieIdMiddleware, (req, res) => {
    // console.log('params: ',req.params);
    MovieModel.find({"id": req.params.id})
        .then(movie => {
            if (movie.length === 0) {
                res.send(`No existe ${req.params.id} como id`)
            } else {
                res.send(movie)
            }
        })
        .catch(error => console.log(error))
});

//GET MOVIE BY GENDER
// router.get("/generos/:gender", function(req, res) {
//     // let value_params = req.params.gender;
//     let regex = new RegExp( req.params.gender , "gi");
//     console.log(regex);
//     GeneroModel.findOne({name:regex},function(err, genero) {
//         // console.log('generos: ',genero.id);
//         let idGenero = genero.id;
//         MovieModel.find({genre_ids:idGenero},function(err, movies){
//             res.status(200).send(movies);
//             // console.log(movies)
//         });
//     });
// });
router.get("/generos/:gender", function (req, res) {
    // let value_params = req.params.gender;
    let regex = new RegExp(req.params.gender, "gi");
    console.log(regex);
    GeneroModel.findOne({name: regex}, function (err, genero) {
        // console.log('generos: ',genero.id);
        if (genero === null || genero.length === 0){
            res.send(`No existe ${req.params.gender} como género`)
        } else {
            let idGenero = genero.id;
            MovieModel.find({genre_ids: idGenero}, function (err, movies) {
                res.status(200).send(movies);
            });
        }
    });
});


//GET MOVIE BY TITLE
router.get('/titulos/:title', (req, res) => {
    let regex = new RegExp(".*." + req.params.title + ".*.", "gi");
    MovieModel.find({title: regex})
        .then(movie =>{
            if(movie.length === 0 || movie === null){
                res.send(`No existe ${req.params.title} como título`)
            }else{
                res.send(movie)
            }
        })
        .catch(error => console.log(error))
});

//GET MOVIE BY ACTORS


module.exports = router;