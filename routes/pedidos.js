const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const config = require('../config');

//ADD TOOLS
const {CalculaEntrega} = require('../horaEntregaCalc');//SCRIPT PARA CALCULAR FECHA DE REGISTRO Y ENTREGA DE ALQUILER

//ADD MODELS
const PedidosModel = require('../models/Pedidos');//MODELO DE PEDIDOS

//ADD MIDDELWARES
const compruebaUser = require('../middlewares/compruebaUser');
const compReservasMiddleware = require('../middlewares/compReservasMiddleware');//MIDDLEWARE PARA COMPROBAR RESERVAS
const tokenMiddleware = require('../middlewares/tokenMiddleware');//MIDDLEWARE PARA COMPROBACIÓN TOKEN

//GET PEDIDO USER
//BUSCA PEDIDOS DE ALQUILER DE USUARIOS
router.get("/:id", tokenMiddleware.ensureAuthenticated, compruebaUser, function (req, res) {

    PedidosModel.findOne({user_id: req.params.id})
        .then(pedido => {
            if (pedido === null) res.send('No tienes ningún pedido. realiza el primero');//Comprobamos si el objeto es null. Si lo es, no existe registro de ususario con alquiler.
            if (!pedido.movie_id) res.send('No tienes ningún pedido actualmente');//Comprobamos si tiene una película en alquiler.
            res.send(pedido);//SI EXISTE DEVUELVE EL OBJETO DEL PEDIDO
        })
        .catch(err => {
            res.send('Error al mostrar pedidos. Intentelo más tarde');
        })
});

//POST PEDIDO USER
//GUARDA PEDIDOS DE ALQUILER DE USUARIOS Y LOS CREA SI NO EXISTEN
router.post('/:id', tokenMiddleware.ensureAuthenticated, compruebaUser, compReservasMiddleware, (req, res) => {
    const token = req.headers.authorization.split(" ")[1];//Divide la 'KEY authorization' para separar el tipo del string token
    const payload = jwt.decode(token, config.TOKEN_SECRET);//Si existe TOKEN lo decodifica  para comprobar la caducidad
    const user = payload.sub;
    PedidosModel.findOneAndUpdate({user_id: user}, {
            user_id: user,// INTRODUCIMOS EL ID DE USUARIO QUE HEMOS EXTRAIDO DEL TOKEN
            movie_id: req.body.movie_id,//INSERTAMOS EL ID DE LA PELÍCULA. ANTES PASÓ POR EL MIDDLEWARE 'compReservasMiddleware' PARA COMPROBAR SI ES NUMBER
            fechaEntrega: CalculaEntrega(),//UTILIZAMOS FUNCIÓN PARA INSERTAR LA FECHA DEL MOMENTO DEL PEDIDO
            fechaDevolucion: CalculaDevolucion(10, CalculaEntrega())//UTILIZAMOS FUNCIÓN PARA CALCULAR FECHA DE EXPIRACIÓN DE ALQUILER
        },
        //CON UPPSERT LE DECIMOS QUE LO CREE SI NO EXISTE Y NEW DEVUELVE EL DOCUMENTO MODIFICADO
        {upsert: true, new: true})
        .then(resp => res.send(resp))
        .catch(err => res.send('No se ha podido alquilar la película. Intentalo más tarde.'))
});


module.exports = router;
