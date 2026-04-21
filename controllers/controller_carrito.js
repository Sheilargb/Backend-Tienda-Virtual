const { tbb_carritos, tbd_carrito_detalle, tbb_productos } = require('../models');

async function sincronizarDetalles(carritoId, products = []) {
    await tbd_carrito_detalle.destroy({
        where: { id_carrito: carritoId },
    });

    if (!Array.isArray(products) || !products.length) {
        return;
    }

    await Promise.all(products.map((producto) => tbd_carrito_detalle.create({
        id_carrito: carritoId,
        id_producto: producto.productId || producto.id_producto,
        precio_unitario: producto.precio_unitario ?? producto.price ?? 0,
        cantidad: producto.quantity || producto.cantidad || 1,
    })));
}

function serializarCarrito(carrito) {
    const data = carrito.toJSON ? carrito.toJSON() : carrito;
    const detalles = Array.isArray(data.detalles) ? data.detalles : [];

    return {
        ...data,
        userId: data.id_usuario,
        date: data.fecha_creacion,
        products: detalles.map((detalle) => ({
            id: detalle.id,
            productId: detalle.id_producto,
            quantity: detalle.cantidad,
            price: Number(detalle.precio_unitario),
            product: detalle.producto || null,
        })),
    };
}

module.exports = {
    async create(req, res) {
        try {
            const products = Array.isArray(req.body.products) ? req.body.products : [];
            const carrito = await tbb_carritos.create({
                id_usuario: req.body.id_usuario || req.body.userId,
                total: req.body.total ?? 0,
                estado: req.body.estado || 'pendiente',
                fecha_creacion: req.body.fecha_creacion || req.body.date || new Date(),
            });

            await sincronizarDetalles(carrito.id, products);

            const carritoCompleto = await tbb_carritos.findByPk(carrito.id, {
                include: [{
                    model: tbd_carrito_detalle,
                    as: 'detalles',
                    include: [{
                        model: tbb_productos,
                        as: 'producto',
                    }],
                }],
            });

            return res.status(200).send(serializarCarrito(carritoCompleto));
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    list(_, res) {
        return tbb_carritos
            .findAll({
                include: [{
                    model: tbd_carrito_detalle,
                    as: 'detalles',
                    include: [{
                        model: tbb_productos,
                        as: 'producto',
                    }],
                }],
            })
            .then(carritos => res.status(200).send(carritos.map(serializarCarrito)))
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
            .findAll({
                where,
                include: [{
                    model: tbd_carrito_detalle,
                    as: 'detalles',
                    include: [{
                        model: tbb_productos,
                        as: 'producto',
                    }],
                }],
            })
            .then(carritos => res.status(200).send(carritos.map(serializarCarrito)))
            .catch(error => res.status(400).send(error));
    },

    async update(req, res) {
        try {
            const carrito = await tbb_carritos.findByPk(req.params.id);

            if (!carrito) {
                return res.status(404).send({
                    message: 'Carrito no encontrado',
                });
            }

            await carrito.update({
                id_usuario: req.body.id_usuario ?? req.body.userId ?? carrito.id_usuario,
                total: req.body.total ?? carrito.total,
                estado: req.body.estado ?? carrito.estado,
                fecha_creacion: req.body.fecha_creacion ?? req.body.date ?? carrito.fecha_creacion,
            });

            if (Array.isArray(req.body.products)) {
                await sincronizarDetalles(carrito.id, req.body.products);
            }

            const carritoActualizado = await tbb_carritos.findByPk(req.params.id, {
                include: [{
                    model: tbd_carrito_detalle,
                    as: 'detalles',
                    include: [{
                        model: tbb_productos,
                        as: 'producto',
                    }],
                }],
            });

            return res.status(200).send(serializarCarrito(carritoActualizado));
        } catch (error) {
            return res.status(400).send(error);
        }
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
