const UserModel = require('../models/User');

const profilePassword = (req, res, next) => {
    UserModel.findOne({_id: req.params.id})
        .then(user => {
            // res.send(typeof user._id + ' - ' + typeof req.params.id)
            if(user._id.toString() === req.params.id ){
                next();
            }else{
                res.send('La contraseña es incorrecta');
            }
        })
        .catch(err => console.log(err));

};

module.exports = profilePassword;