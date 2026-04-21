const { tbc_usuarios } = require('../models');

function splitNombreCompleto(nombre = '') {
    const partes = String(nombre).trim().split(/\s+/).filter(Boolean);
    const firstname = partes.shift() || '';
    const lastname = partes.join(' ');

    return { firstname, lastname };
}

function construirNombre(reqBody = {}) {
    if (reqBody.nombre) {
        return reqBody.nombre;
    }

    if (reqBody.name && typeof reqBody.name === 'object') {
        const firstname = reqBody.name.firstname || '';
        const lastname = reqBody.name.lastname || '';
        const nombre = `${firstname} ${lastname}`.trim();

        if (nombre) {
            return nombre;
        }
    }

    if (reqBody.username) {
        return reqBody.username;
    }

    return null;
}

function construirDireccion(reqBody = {}) {
    if (reqBody.direccion) {
        return reqBody.direccion;
    }

    if (reqBody.address && typeof reqBody.address === 'object') {
        const { street, number, city } = reqBody.address;
        return [street, number, city].filter(Boolean).join(' ').trim() || null;
    }

    return '';
}

function construirTelefono(reqBody = {}) {
    return reqBody.telefono || reqBody.phone || '';
}

function serializarUsuario(usuario) {
    const data = usuario.toJSON ? usuario.toJSON() : usuario;
    const { firstname, lastname } = splitNombreCompleto(data.nombre);

    return {
        ...data,
        username: data.email ? data.email.split('@')[0] : data.nombre,
        phone: data.telefono,
        name: {
            firstname,
            lastname,
        },
        address: {
            street: data.direccion,
            number: '',
            city: '',
        },
    };
}

module.exports = {
    create(req, res) {
        const nombre = construirNombre(req.body);
        const direccion = construirDireccion(req.body);
        const telefono = construirTelefono(req.body);

        return tbc_usuarios
            .create({
                nombre,
                direccion,
                telefono,
                email: req.body.email,
                password: req.body.password,
                rol: req.body.rol || 'cliente',
                fecha_registro: req.body.fecha_registro || new Date(),
            })
            .then(usuario => res.status(200).send(serializarUsuario(usuario)))
            .catch(error => res.status(400).send(error));
    },

    list(_, res) {
        return tbc_usuarios
            .findAll({})
            .then(usuarios => res.status(200).send(usuarios.map(serializarUsuario)))
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
            .then(usuarios => res.status(200).send(usuarios.map(serializarUsuario)))
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
                        nombre: construirNombre(req.body) ?? usuario.nombre,
                        direccion: construirDireccion(req.body) ?? usuario.direccion,
                        telefono: construirTelefono(req.body) ?? usuario.telefono,
                        email: req.body.email ?? usuario.email,
                        password: req.body.password ?? usuario.password,
                        rol: req.body.rol ?? usuario.rol,
                        fecha_registro: req.body.fecha_registro ?? usuario.fecha_registro,
                    })
                    .then(usuarioActualizado => res.status(200).send(serializarUsuario(usuarioActualizado)))
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
