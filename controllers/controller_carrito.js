const { tbb_carritos } = require('../models');

module.exports = {
    create(req, res) {
        return tbb_carritos
            .create({
                id_usuario: req.body.id_usuario,
                total: req.body.total,
                estado: req.body.estado,
                fecha_creacion: req.body.fecha_creacion,
            })
            .then(carrito => res.status(200).send(carrito))
            .catch(error => res.status(400).send(error));
    },

    list(_, res) {
        return tbb_carritos
            .findAll({})
            .then(carrito => res.status(200).send(carrito))
            .catch(error => res.status(400).send(error));
    },

    find(req, res) {
        const where = {};

        if (req.params.id) {
            where.id = req.params.id;
        }

        if (req.params.id_usuario) {
            where.id_usuario = req.params.id_usuario;
        }

        return tbb_carritos
            .findAll({ where })
            .then(carrito => res.status(200).send(carrito))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return tbb_carritos
            .findByPk(req.params.id)
            .then(carrito => {
                if (!carrito) {
                    return res.status(404).send({
                        message: 'Carrito no encontrado',
                    });
                }

                return carrito
                    .update({
                        id_usuario: req.body.id_usuario ?? carrito.id_usuario,
                        total: req.body.total ?? carrito.total,
                        estado: req.body.estado ?? carrito.estado,
                        fecha_creacion: req.body.fecha_creacion ?? carrito.fecha_creacion,
                    })
                    .then(carritoActualizado => res.status(200).send(carritoActualizado))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return tbb_carritos
            .findByPk(req.params.id)
            .then(carrito => {
                if (!carrito) {
                    return res.status(404).send({
                        message: 'Carrito no encontrado',
                    });
                }

                return carrito
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Carrito eliminado correctamente',
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
