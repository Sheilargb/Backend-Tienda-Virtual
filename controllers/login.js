const jwt = require('jsonwebtoken');
const { tbc_usuarios } = require('../models');

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({
                    message: 'El email y la password son obligatorios',
                });
            }

            const usuario = await tbc_usuarios.findOne({
                where: { email },
            });

            if (!usuario) {
                return res.status(404).send({
                    message: 'El usuario no existe',
                });
            }

            if (usuario.password !== password) {
                return res.status(401).send({
                    message: 'Contraseña incorrecta',
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    rol: usuario.rol,
                },
                process.env.JWT_SECRET || 'clave_secreta_temporal',
                { expiresIn: '2h' }
            );

            return res.status(200).send({
                message: 'Login correcto',
                token,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    rol: usuario.rol,
                },
            });
        } catch (error) {
            return res.status(500).send({
                message: 'Error al iniciar sesion',
                error: error.message,
            });
        }
    },
};
