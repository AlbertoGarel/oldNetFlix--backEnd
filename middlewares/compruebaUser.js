const jwt = require('jwt-simple');
const config = require('../config');

const profileUser = (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];//Divide la 'KEY authorization' para separar el tipo del string token
    const payload = jwt.decode(token, config.TOKEN_SECRET);//Si existe TOKEN lo decodifica  para comprobar la caducidad
    const user = payload.sub;

    if(user === req.params.id){//COMPROBAMOS QUE USER DE TOKEN E ID DE URL ES LA MISMA. si es, damos paso
        next();
    }else{
        res.status(400).send('El usuario no se corresponde con la identificación');
    }
};

module.exports = profileUser;
