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

//POST perfil
router.post('/me', tokenMiddleware.ensureAuthenticated, (req, res,) => {
    UserModel.findOne({
        username: req.body.username,
        password: req.body.password
    })
        .then(user => res.send(user))
        .catch(err => {
            console.log(err);
            res.send('Error al registrarse.')
        })
});
//POST LOGIN
router.post('/login', (req, res,) => {
    UserModel.findOne({
        username: req.body.username,
        // password:req.body.password
    })
        .then(user => {
            user.comparePass(req.body.password)
                .then(isMatch => {
                    console.log('isMatch', isMatch);
                    if (!isMatch) res.send('Contraseña incorrecta');

                    // console.log('token', token);
                    // console.log('tokenlength', user.tokens.length);
                    let token = '';
                    if (user.tokens.length === 3) {
                        res.send('Ya tienes más de tres sesiones abiertas')
                    } else {
                        token = service.createToken(user);
                        UserModel.findByIdAndUpdate({_id: user._id}, {$push: {tokens: token}})
                            .then(resp => res.send(user))
                    }

                    // res.send(token)
                });
            // res.send({token: service.createToken(user._id)})//pasar al cuerpo de promesa
        })
        .catch(err => {
            console.log(err);
            res.send('Error en el Login. Compruebe los campos.')
        })
});

//LOGOUT
router.patch('/logout', tokenMiddleware.ensureAuthenticated, async (req, res) => {
    try{
        let user = await UserModel.findOneAndUpdate({tokens:req.headers.authorization.split(' ')[1]},
            {
                $pull: {
                    tokens: req.headers.authorization.split(' ')[1]
                }
            });
        if(!user) res.send('ya se finalizó sesión con este token');
        res.send(`Hasta pronto ${user.username }`)
    }catch{
        res.status(500).send('error al realizar la operación');
    }
});

/*POST REGISTER USER*/
router.post('/register', async (req, res) => {
    // res.send(req.body.username + '-' + req.body.password)
    try {
        const user = await new UserModel({
            username: req.body.username,
            password: req.body.password
        }).save();
        res.send('Registrado con éxito');
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
