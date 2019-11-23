const PedidosModel = require('../models/Pedidos');//Se requiere modelo de pedidos.
const jwt = require('jwt-simple');
const config = require('../config');
//ADD TOOLS
const {CalculaEntrega} = require('../horaEntregaCalc');//SCRIPT PARA CALCULAR FECHA DE REGISTRO Y ENTREGA DE ALQUILER

const profileReservas = (req, res, next) => {
    //Lo PRIMERO COMPROBAMOS QUE LOS DATOS LLEGAN CORRECTOS. SI ES INTEGER PASA COMPROBAR SI EXISTE CUENTA ALQUILERES DE USUARIO
    if (!isNaN(req.body.movie_id)) {
        const token = req.headers.authorization.split(" ")[1];//Divide la 'KEY authorization' para separar el tipo del string token
        const payload = jwt.decode(token, config.TOKEN_SECRET);//Si existe TOKEN lo decodifica  para comprobar la caducidad
        const user = payload.sub;
        //Buscamos 'uno' con el parámetro de la url
        PedidosModel.findOne({user_id: user})
            .then(data => {
                console.log('data', data);
                if (!data) {//si no existe damos paso
                    return next();
                }
                if (data.fechaDevolucion >= CalculaEntrega()) {//si la fecha de devolución registrada es mayor que la de la siguiente entrega
                    return next();
                }
                res.send('ya tienes una película alquilada')
            })
            .catch(err => {
                console.log(err);
                res.send('Error, no se puede reservar película.')
            });
    } else {
        res.send('Identificador de película debe ser número entero');
    }
};

module.exports = profileReservas;
