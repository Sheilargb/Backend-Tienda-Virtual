const { tbc_usuarios } = require('../models');

module.exports = {
    create(req, res) {
        return tbc_usuarios
            .create({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: req.body.password,
                rol: req.body.rol,
                fecha_registro: req.body.fecha_registro,
            })
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error));
    },

    list(_, res) {
        return tbc_usuarios
            .findAll({})
            .then(usuario => res.status(200).send(usuario))
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

        if (req.params.email) {
            where.email = req.params.email;
        }

        return tbc_usuarios
            .findAll({ where })
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return tbc_usuarios
            .findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario no encontrado',
                    });
                }

                return usuario
                    .update({
                        nombre: req.body.nombre ?? usuario.nombre,
                        direccion: req.body.direccion ?? usuario.direccion,
                        telefono: req.body.telefono ?? usuario.telefono,
                        email: req.body.email ?? usuario.email,
                        password: req.body.password ?? usuario.password,
                        rol: req.body.rol ?? usuario.rol,
                        fecha_registro: req.body.fecha_registro ?? usuario.fecha_registro,
                    })
                    .then(usuarioActualizado => res.status(200).send(usuarioActualizado))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return tbc_usuarios
            .findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario no encontrado',
                    });
                }

                return usuario
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Usuario eliminado correctamente',
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
