const express = require('express');
const router = express.Router();
const service = require('../services');

//ADD MODELS
const UserModel = require('../models/User');
//ADD MIDDELWARES
const compruebaPassword = require('../middlewares/compruebaPassword');
const compruebaUser = require('../middlewares/compruebauser');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

/* GET USERS LISTING */
// router.get('/', (req, res) => {
//     UserModel.find({})
//         .then(users => res.send(users))
//         .catch(error => console.log(error))
// });
//POST LOGIN
router.post('/login', (req, res,) => {
    UserModel.findOne({
        username:req.body.username,
        password:req.body.password
    })
        .then(user => res.send({token: service.createToken(user)}))
        .catch(err => {
            console.log(err);
            res.send('Error al registrarse.')
        })
});

/*POST REGISTER USER*/
router.post('/register', async (req, res) => {
    // res.send(req.body.username + '-' + req.body.password)
    try {
        const user = await new UserModel({
            username: req.body.username,
            password: req.body.password
        }).save();
        // res.send(user)
        res.send({token: service.createToken(user), user});
    } catch (error) {
        console.log(error);
        res.send(`"${req.body.username}" no está disponible como nombre de Usuario`)
    }
});

/*PATCH NAMEUSER*/
router.patch('/changename/:id', tokenMiddleware.ensureAuthenticated, compruebaPassword, (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, {
        username: req.body.username
    }, {new: true, useFindAndModify: false})
        .then(user => res.send('Nombre de usuario cambiado correctamente'))
        .catch(error => {
            console.log(error);
            res.send('Error al cambiar nombre de usuario.')
        })
});

/*PATCH PASSWORD USER*/
router.patch('/changepass/:id', tokenMiddleware.ensureAuthenticated, compruebaPassword, (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, {
        password: req.body.password
    }, {new: true, useFindAndModify: false})
        .then(user => res.send('Password de usuario cambiado correctamente'))
        .catch(error => {
            console.log(error);
            res.send('Error al cambiar password de usuario.')
        })
});

/*DELETE USER*/

/*RECUPERA PASSWORD*/
router.get('/recupass/:id', tokenMiddleware.ensureAuthenticated, compruebaUser, (req, res,) => {
    UserModel.findOne({_id: req.params.id})
        .then(user => res.send(user.password))
        .catch(err => {
            console.log(err);
            res.send('Error al recuperar password.')
        })
});

module.exports = router;
