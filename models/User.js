const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    tokens: []
});

UserSchema.methods.toJSON = function (params) {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    delete user.__v;
    return user;
}

UserSchema.methods.comparePass = function (password) {
    const user = this;
    // console.log(user);
    return bcrypt.compare(password, user.password)
};

UserSchema.pre('save', function (next) {
    const user = this;
    console.log('salt', salt);
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        console.log('user', user);
        console.log('hash', hash);
        next();
    })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        });
});

UserSchema.methods.hashPass = function (password) {
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        console.log('user', user);
        console.log('hash', hash);
        next();
    })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        });
};

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
