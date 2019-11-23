const profileID = (req, res, next) => {
    //Comprueba que el valor recibido es Number
    if (!isNaN(req.params.id)) {
        next();
    } else {
        //Si no es Integer devolverà error en la petición( en este caso parámetro erróneo.
        res.status(400).send('El id debe ser un número entero');
    }
};

module.exports = profileID;
