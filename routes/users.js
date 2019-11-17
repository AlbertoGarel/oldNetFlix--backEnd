var express = require('express');
var router = express.Router();

//ADD MODELS
const UserModel = require('../models/User');
//ADD MIDDELWARES
const compruebaPassword = require('../middlewares/compruebaPassword');

/* GET USERS LISTING */
router.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.send(users))
        .catch(error => console.log(error))
});

/*POST REGISTER USER*/
router.post('/register', async (req, res) => {
    // res.send(req.body.username + '-' + req.body.password)
    try {
        const user = await new UserModel({
            username: req.body.username,
            password: req.body.password
        }).save();
        res.send(user)
    } catch (error) {
        console.log(error);
        res.send(`"${req.body.username}" no está disponible como nombre de Usuario`)
    }
});

/*PATCH USER*/
router.patch('/changepass/:id', compruebaPassword, (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, {
        username: req.body.username
    }, {new: true, useFindAndModify: false})
        .then(user => res.send('Nombre de usuario cambiado correctamente'))
        .catch(error =>{
          console.log(error);
          res.send('Error al cambiar nombre de usuario.')
        })
});

/*DELETE USER*/

module.exports = router;
