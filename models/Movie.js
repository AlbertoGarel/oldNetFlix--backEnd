const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({

    id:Number,
    title:String,
    vote_average:Number,
    poster_path:String,
    release_date:String,
    overview:String

});

const MovieModel = mongoose.model('movie', MovieSchema);
module.exports = MovieModel;