const { tbc_categorias } = require('../models');

module.exports = {
    create(req, res) {
        return tbc_categorias
            .create({
                nombre: req.body.nombre,
            })
            .then(categoria => res.status(200).send(categoria))
            .catch(error => res.status(400).send(error));
    },

    list(_, res) {
        return tbc_categorias
            .findAll({})
            .then(categoria => res.status(200).send(categoria))
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

        return tbc_categorias
            .findAll({ where })
            .then(categoria => res.status(200).send(categoria))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return tbc_categorias
            .findByPk(req.params.id)
            .then(categoria => {
                if (!categoria) {
                    return res.status(404).send({
                        message: 'Categoria no encontrada',
                    });
                }

                return categoria
                    .update({
                        nombre: req.body.nombre ?? categoria.nombre,
                    })
                    .then(categoriaActualizada => res.status(200).send(categoriaActualizada))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return tbc_categorias
            .findByPk(req.params.id)
            .then(categoria => {
                if (!categoria) {
                    return res.status(404).send({
                        message: 'Categoria no encontrada',
                    });
                }

                return categoria
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Categoria eliminada correctamente',
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
