const express = require('express');
const router = express.Router();
const service = require('../services');
// const axios = require('axios');

//add tools
const {CalculaEntrega} = require('../horaEntregaCalc');
//ADD MODELS
const PedidosModel = require('../models/Pedidos');
//ADD MIDDELWARES
const compReservasMiddleware = require('../middlewares/compReservasMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

//GET PEDIDO USER
router.get("/:id", tokenMiddleware.ensureAuthenticated, function (req, res) {
    PedidosModel.findOne({user_id: req.params.id})
        .then(pedido => res.send(pedido))
        .catch(err => {
            console.log('err');
            res.send('Error al mostrar pedidos. Intentelo más tarde')
        })
});

//POST USER PEDIDO
router.post("/:id", tokenMiddleware.ensureAuthenticated, compReservasMiddleware, async (req, res) => {
    try {
        const pedido = await new PedidosModel({
            user_id: req.params.id,
            movie_id: req.body.movie_id,
            fechaEntrega: CalculaEntrega(),
            fechaDevolucion: CalculaDevolucion(10, CalculaEntrega())
        }).save();
        res.send(pedido)
    } catch (error) {
        console.log(error);
        res.send(`No se ha podido reservar la película. Intentelo más tarde.`)
    }
});


module.exports = router;
