const mongoose = require('mongoose');

const GeneroSchema = mongoose.Schema({

    id:Number,
    name:String

});

const GeneroModel = mongoose.model('generos', GeneroSchema);
module.exports = GeneroModel;