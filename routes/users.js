var express = require('express');
var router = express.Router();

const UserModel = require('../models/User');

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
router.patch('/:id', (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    username: req.body.username
  },{new:true,useFindAndModify:false})
      .then(user=>res.send(user))
      .catch(error=>console.log(error))
});

/*DELETE USER*/

module.exports = router;
