const profileID = (req, res, next) => {
    if (!isNaN(req.params.id)) {
        next();
    } else {
        res.send('El id debe ser un número entero');
    }
};

module.exports = profileID;