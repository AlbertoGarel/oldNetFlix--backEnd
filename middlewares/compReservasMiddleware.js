const PedidosModel = require('../models/Pedidos');

const profileReservas = (req, res, next) => {
    console.log(req.params.id)
    PedidosModel.findOne({user_id: req.params.id})
        .then(data => {
            if (data === null) {
                next();
            } else {
                res.send('Ya tienes una pelicula reservada.')
            }
        })
        .catch(err => {
            console.log(err);
            res.send('Error, no se puede reservar película.')
        })
};

module.exports = profileReservas;