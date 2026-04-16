const { tbb_productos } = require('../models');

module.exports = {
    create(req, res) {
        return tbb_productos
            .create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen,
                precio: req.body.precio,
                stock: req.body.stock,
                id_categoria: req.body.id_categoria,
            })
            .then(producto => res.status(200).send(producto))
            .catch(error => res.status(400).send(error));
    },

    list(_, res) {
        return tbb_productos
            .findAll({})
            .then(producto => res.status(200).send(producto))
            .catch(error => res.status(400).send(error));
    },

    find(req, res) {
        const where = {};

        if (req.params.id) {
            where.id = req.params.id;
        }

        if (req.params.nombre) {
            where.nombre = req.params.nombre;
        }

        return tbb_productos
            .findAll({ where })
            .then(producto => res.status(200).send(producto))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return tbb_productos
            .findByPk(req.params.id)
            .then(producto => {
                if (!producto) {
                    return res.status(404).send({
                        message: 'Producto no encontrado',
                    });
                }

                return producto
                    .update({
                        nombre: req.body.nombre ?? producto.nombre,
                        descripcion: req.body.descripcion ?? producto.descripcion,
                        imagen: req.body.imagen ?? producto.imagen,
                        precio: req.body.precio ?? producto.precio,
                        stock: req.body.stock ?? producto.stock,
                        id_categoria: req.body.id_categoria ?? producto.id_categoria,
                    })
                    .then(productoActualizado => res.status(200).send(productoActualizado))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return tbb_productos
            .findByPk(req.params.id)
            .then(producto => {
                if (!producto) {
                    return res.status(404).send({
                        message: 'Producto no encontrado',
                    });
                }

                return producto
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Producto eliminado correctamente',
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
