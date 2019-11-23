const express = require('express');
const router = express.Router();

//ADD MODELS
const MovieModel = require('../models/Movie');
const GeneroModel = require('../models/Genero');
const EstrenosModel = require('../models/Estrenos');

//ADD MIDDLEWARE
const movieIdMiddleware = require('../middlewares/movieIdMiddleware');


//GET ALL
//Busca y Lista todas las películas y muestra todas las propiedades de las mismas
router.get('/', (req, res) => {
    MovieModel.find({})
        .then(movie => res.send(movie))
        .catch(error => console.log(error))
});

//GET MOVIE BY UPCOMMING
//busca y Lista todas las películas marcadas como estrenos y muestra todas las propiedades de las mismas
router.get('/estrenos', (req, res) => {
    EstrenosModel.find({})
        .then(estrenos => res.send(estrenos))
        .catch(error => console.log(error))
    // res.send('estas en estrenos')
});

//GET MOVIE BY ID
// Busca y lista todas las películas por ID
router.get('/:id', movieIdMiddleware, (req, res) => {
    // console.log('params: ',req.params);
    MovieModel.find({"id": req.params.id})
        .then(movie => {
            if (movie.length === 0) {
                res.status(400)
                    .send(`No existe ${req.params.id} como id`)
            } else {
                res.status(200)
                    .send(movie)
            }
        })
        .catch(error => console.log(error))
});

//GET MOVIES BY GENRE
//BUSCA Y LISTA TODAS LAS PELÍCULAS POR GÉNERO
router.get("/generos/:gender", function (req, res) {

    let regex = new RegExp(req.params.gender, "gi");

    GeneroModel.findOne({name: regex}, function (err, genero) {
        if (genero === null || genero.length === 0) {
            res.status(400)
                .send(`No existe ${req.params.gender} como género`)
        } else {
            let idGenero = genero.id;
            MovieModel.find({genre_ids: idGenero}, function (err, movies) {
                res.status(200)
                    .send(movies);
            });
        }
    });
});

//GET MOVIE BY TITLE
//BUSCA Y LISTA TODAS LAS PELÍCULAS POR TÍTULO
router.get('/titulos/:title', (req, res) => {
    let regex = new RegExp(req.params.title, "gi");
    MovieModel.find({title: regex})
        .then(movie => {
            if (movie.length === 0 || movie === null) {
                res.send(`No existe ${req.params.title} como título`)
            } else {
                res.send(movie)
            }
        })
        .catch(error => console.log(error))
});


module.exports = router;
