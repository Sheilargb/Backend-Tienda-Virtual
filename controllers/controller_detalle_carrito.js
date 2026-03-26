const { tbd_carrito_detalle } = require('../models');

module.exports = {
    create(req, res) {
        return tbd_carrito_detalle
            .create({
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad,
            })
            .then(detalle => res.status(200).send(detalle))
            .catch(error => res.status(400).send(error));
    },

    list(_, res) {
        return tbd_carrito_detalle
            .findAll({})
            .then(detalle => res.status(200).send(detalle))
            .catch(error => res.status(400).send(error));
    },

    find(req, res) {
        const where = {};

        if (req.params.id) {
            where.id = req.params.id;
        }

        if (req.params.id_carrito) {
            where.id_carrito = req.params.id_carrito;
        }

        if (req.params.id_producto) {
            where.id_producto = req.params.id_producto;
        }

        return tbd_carrito_detalle
            .findAll({ where })
            .then(detalle => res.status(200).send(detalle))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return tbd_carrito_detalle
            .findByPk(req.params.id)
            .then(detalle => {
                if (!detalle) {
                    return res.status(404).send({
                        message: 'Detalle de carrito no encontrado',
                    });
                }

                return detalle
                    .update({
                        id_carrito: req.body.id_carrito ?? detalle.id_carrito,
                        id_producto: req.body.id_producto ?? detalle.id_producto,
                        precio_unitario: req.body.precio_unitario ?? detalle.precio_unitario,
                        cantidad: req.body.cantidad ?? detalle.cantidad,
                    })
                    .then(detalleActualizado => res.status(200).send(detalleActualizado))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return tbd_carrito_detalle
            .findByPk(req.params.id)
            .then(detalle => {
                if (!detalle) {
                    return res.status(404).send({
                        message: 'Detalle de carrito no encontrado',
                    });
                }

                return detalle
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Detalle de carrito eliminado correctamente',
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
