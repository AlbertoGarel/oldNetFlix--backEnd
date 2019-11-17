var express = require('express');
var router = express.Router();
// const axios = require('axios');

//add tools
const {CalculaEntrega} = require('../horaEntregaCalc');
//ADD MODELS
const UserModel = require('../models/User');
const PedidosModel = require('../models/Pedidos');
//ADD MIDDELWARES

//POST USER PEDIDO
router.post("/:id", async (req, res) => {
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
        res.send(`no se ha podido reservar la película`)
    }
});


module.exports = router;