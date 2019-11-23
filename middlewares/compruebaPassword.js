const UserModel = require('../models/User');

const profilePassword = (req, res, next) => {
    UserModel.findOne({_id: req.params.id})
        .then(user => {
            if(user._id.toString() === req.params.id ){
                //Comparamos el id de los parámetros de la url y lo comparamos con la BBDD. Pasamos el id del objeto a string para poder comparar. Si son iguales damos paso
                console.log('--------------------------------------------------------------------------------------------------------------------------------------------------------------')
                next();
            }else{
                //Si no son iguales, enviamos mensaje a usuario
                res.send('La contraseña es incorrecta');
            }
        })
        .catch(err => console.log(err));

};

module.exports = profilePassword;
