const PedidosModel = require('../models/Pedidos');

const profileReservas = (req, res, next) => {
    console.log(req.params.id)
    const existe = PedidosModel.findOne({user_id: req.params.id})
    existe
        .then(data => {
        if (data === null) {
            next();
        } else {
            res.send('Ya tienes una pelicula reservada.')
        }
    })
        .catch(err => {

        })

};

module.exports = profileReservas;