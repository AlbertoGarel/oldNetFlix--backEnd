const express = require('express');
const router = express.Router();
const service = require('../services');
const bcrypt = require('bcryptjs');

//ADD MODELS
const UserModel = require('../models/User');
//ADD MIDDELWARES
const compruebaUser = require('../middlewares/compruebauser');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

//POST perfil
//OBTENEMOS EL PERFIL DEL USUARIO
router.post('/me', tokenMiddleware.ensureAuthenticated, (req, res,) => {

    UserModel.findOne({
        username: req.body.username
    })
        .then(user => {
            const isMatch = user.comparePass(req.body.password);//comparamos la contraseña encrriptada y la proporcionada por el usuario
            if (!isMatch) {
                return res.status(400).send({
                    message: 'Usuario o contraseña incorrectos'
                })//si no es correcta enviamos error
            } else {
                res.send(user);
            }
        })
        .catch(err => {
            console.log(err);
            res.send('Error al registrarse.')
        })
});

//POST LOGIN
//LOGIN PARA USUARIO
router.post('/login', (req, res,) => {
    UserModel.findOne({
        username: req.body.username
    })
        .then(user => {
            user.comparePass(req.body.password)
                .then(isMatch => {
                    if (!isMatch) res.send('Contraseña incorrecta');
                    let token = '';
                    if (user.tokens.length === 3) {
                        res.send('Ya tienes más de tres sesiones abiertas')
                    } else {
                        token = service.createToken(user);
                        UserModel.findByIdAndUpdate({_id: user._id}
                            , {$push: {tokens: token}}
                            , {new: true, useFindAndModify: false})
                            .then(user => res.send({token: user.tokens[user.tokens.length - 1], user}))
                    }
                });
        })
        .catch(err => {
            console.log(err);
            res.send('Error en el Login. Usuario no existe.')
        })
});

//LOGOUT
router.patch('/logout', tokenMiddleware.ensureAuthenticated, async (req, res) => {
    try {
        let user = await UserModel.findOneAndUpdate({tokens: req.headers.authorization.split(' ')[1]},
            {
                $pull: {
                    tokens: req.headers.authorization.split(' ')[1]
                }
            }, {new: true, useFindAndModify: false});
        if (!user) res.send('ya se finalizó sesión con este token');
        res.send(`Hasta pronto ${user.username}`)
    } catch {
        res.status(500).send('error al realizar la operación');
    }
});

/*POST REGISTER USER*/
router.post('/register', async (req, res) => {
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
//cambia el nombre de usuario
router.patch('/changename/:id', tokenMiddleware.ensureAuthenticated, compruebaUser, (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, {
        username: req.body.username
    }, {useFindAndModify: false})
        .then(user => res.send('Nombre de usuario cambiado correctamente'))
        .catch(error => {
            console.log(error);
            res.status(400).send('Error al cambiar nombre de usuario. Pruebe con otro.')
        })
});

/*PATCH PASSWORD USER*/
router.patch('/changepass/:id', tokenMiddleware.ensureAuthenticated, compruebaUser, async (req, res) => {
    let encriptado = await bcrypt.hash(req.body.password, 10);//encryptamos la contraseña del body. Si no se hace, la actualización se queda en texto plano

    UserModel.findByIdAndUpdate(req.params.id, {
        password: encriptado//y la pasamos
    }, {new: true, useFindAndModify: false, runValidators: true})
        .then(user => {
            res.send('Password de usuario cambiado correctamente')
        })
        .catch(error => {
            console.log(error);
            res.send('Error al cambiar password de usuario.')
        })
});


/*RECUPERA PASSWORD*/
//PARA CAMBIAR LA CONTRASEÑA SE REQUIERE PASS
router.post('/recupass', async (req, res,) => {
    let pass = await bcrypt.hash(req.body.password, 10);//bcrypt para la nueva contraseña
    UserModel.findOneAndUpdate({
        _id: req.body._id,
        username: req.body.username
    }, {password: pass})//actualizamos el password
        .then(user => {
            res.send('contraseña cambiada con éxito')
        })
        .catch(err => {
            console.log(err);
            res.send('Error al recuperar password.')
        })
});

module.exports = router;
