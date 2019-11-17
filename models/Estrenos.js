const mongoose = require('mongoose');

const EstrenosSchema = mongoose.Schema({

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

const EstrenosModel = mongoose.model('estrenos', EstrenosSchema);
module.exports = EstrenosModel;