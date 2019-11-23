const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({

    popularity:Number,
    vote_count:Number,
    video:Boolean,
    poster_path:String,
    id:Number,
    adult:Boolean,
    backdrop_path:String,
    original_language:String,
    original_title:String,
    genre_ids:[Number],
    title:String,
    vote_average:Number,
    overview:String,
    release_date:String

});

const MovieModel = mongoose.model('movie', MovieSchema);
module.exports = MovieModel;
