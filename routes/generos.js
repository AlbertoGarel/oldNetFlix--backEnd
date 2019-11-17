var express = require('express');
var router = express.Router();
// const axios = require('axios');

const GeneroModel = require('../models/Genero');
const MovieModel = require('../models/Movie');

/* GET USERS LISTING */
// router.get('/', (req, res) => {
//     // res.send('estás en movies')
//
// });
//GET GENEROS
// router.get('/', (req, res) => {
//     GeneroModel.find({})
//         .then(genero => res.send(genero))
//         .catch(error => console.log(error))
//     // res.send('estamos en generos')
// });

// router.get("/", function(req, res) {//FUNCIONA
//     GeneroModel.find({name:"Acción"},function(err, genero) {
//         console.log(genero[0].id);
//         let idGenero = genero[0].id;
//         MovieModel.find({genre_ids:idGenero},function(err, movies){
//             res.status(200).send(movies);
//             // console.log(movies)
//         });
//     });
// });

// router.get("/:gender", function(req, res) {
//     let value_params = req.params.gender;
//     GeneroModel.findOne({"name":value_params},function(err, genero) {
//         // console.log('generos: ',genero.id);
//         let idGenero = genero.id;
//         MovieModel.find({genre_ids:idGenero},function(err, movies){
//             res.status(200).send(movies);
//             // console.log(movies)
//         });
//     });
// });

// router.get('/:generoid', (req, res) => {
//     // console.log(req.params.title);
//     MovieModel.find({"id":req.params.generoid})
//         .then(movie => res.send(movie))
//         .catch(error => console.log(error))
// });

// router.post('/register', async (req, res) => {
//     try {
//         const movie = await new MovieModel({
//             title: req.body.title,
//             vote_average: req.body.vote_average,
//             poster_path:req.body.poster_path,
//             release_date:req.body.release_date,
//             overview:req.body.overview
//         }).save();
//         res.send(movie)
//     } catch (error) {
//         console.log(error);
//     }
//
// });


module.exports = router;