const mongoose = require('mongoose');

const PedidosSchema = mongoose.Schema({

    user_id:String,
    movie_id:Number,
    fechaEntrega:String,
    fechaDevolucion:String,

});

const PedidosModel = mongoose.model('pedidos', PedidosSchema);
module.exports = PedidosModel;