const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

exports.ensureAuthenticated = function(req, res, next) {
    if(!req.headers.authorization) {
        //comprueba que tiene 'KEY authorization' con 'TOKEN'. Si no lo tiene envia status 'prohibido' y mensaje al usuario.
        return res
            .status(403)
            .send({message: "Tu petición no tiene cabecera de autorización"});
    }

    const token = req.headers.authorization.split(" ")[1];//Divide la 'KEY authorization' para separar el tipo del string token
    const payload = jwt.decode(token, config.TOKEN_SECRET);//Si existe TOKEN lo decodifica  para comprobar la caducidad

    if(payload.exp <= moment().unix()) {//comprueba la caducidad.
        return res
            .status(401)
            .send({message: "El token ha expirado"});
    }

    req.user = payload.sub;
    next();
};
