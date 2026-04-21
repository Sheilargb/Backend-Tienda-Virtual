const db = require('../models');
const categoria = db.tbc_categorias;

function serializarCategoria(registro) {
    const data = registro.toJSON ? registro.toJSON() : registro;

    return {
        ...data,
        category: data.nombre,
    };
}

module.exports = {
    create(req, res) {
        return categoria.create({
                nombre: req.body.nombre || req.body.category
            })
            .then(nuevaCategoria => res.status(200).send(serializarCategoria(nuevaCategoria)))
            .catch(error => res.status(400).send(error));
    },

    list(_, res) {
        return categoria.findAll({})
            .then(categorias => res.status(200).send(categorias.map(serializarCategoria)))
            .catch(error => res.status(400).send(error));
    },

    find(req, res) {
        return categoria.findAll({
                where: {
                    id: req.params.id,
                },
    })
            .then(categorias => res.status(200).send(categorias.map(serializarCategoria)))
            .catch(error => res.status(400).send(error))
    },

    delete(req, res) {
        return categoria.destroy({
                where: {
                    id: req.params.id,
                },                          
        })
            .then(() => res.status(200).send({ message: "Datos eliminados correctamente",  }))
            .catch(error => res.status(400).send(error));
    },
     update(req, res) {
        return categoria.update(
            {
                nombre: req.body.nombre || req.body.category
            }, 
            {
                where: {
                    id: req.params.id,
                },
            })
            .then(() => res.status(200).send({ message: "Datos actualizados correctamente"}))
            .catch(error => res.status(400).send(error));
    }
};
