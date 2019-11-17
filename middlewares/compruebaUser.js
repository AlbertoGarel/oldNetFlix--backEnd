const UserModel = require('../models/User');

const profileUser = (req, res, next) => {
    UserModel.findOne({_id: req.params.id})
        .then(user => {
            // res.send(typeof user._id + ' - ' + typeof req.params.id)
            if(user.username.toString() === req.body.username ){
                next();
            }else{
                res.send('El nombre de usuario no coincide');
            }
        })
        .catch(err => {
            console.log(err);
            res.send('El "id"(identificador) no es correcto')
        });

};

module.exports = profileUser;