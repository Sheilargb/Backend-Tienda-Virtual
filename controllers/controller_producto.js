const { tbb_productos, tbc_categorias } = require('../models');

async function resolverCategoriaId(body = {}, categoriaActualId = null) {
    const idCategoria = body.id_categoria ?? body.categoryId;

    if (idCategoria) {
        return idCategoria;
    }

    const nombreCategoria = body.categoria || body.category;
    if (!nombreCategoria) {
        return categoriaActualId;
    }

    const [categoria] = await tbc_categorias.findOrCreate({
        where: { nombre: nombreCategoria },
        defaults: { nombre: nombreCategoria },
    });

    return categoria.id;
}

function serializarProducto(producto) {
    const data = producto.toJSON ? producto.toJSON() : producto;
    const categoria = data.categoria || {};

    return {
        ...data,
        title: data.nombre,
        price: Number(data.precio),
        description: data.descripcion,
        image: data.imagen,
        category: categoria.nombre || data.category || null,
        categoryId: data.id_categoria,
    };
}

module.exports = {
    async create(req, res) {
        try {
            const idCategoria = await resolverCategoriaId(req.body);

            const producto = await tbb_productos.create({
                nombre: req.body.nombre || req.body.title,
                descripcion: req.body.descripcion || req.body.description,
                imagen: req.body.imagen || req.body.image,
                precio: req.body.precio ?? req.body.price,
                stock: req.body.stock ?? 0,
                id_categoria: idCategoria,
            });

            const productoCompleto = await tbb_productos.findByPk(producto.id, {
                include: [{
                    model: tbc_categorias,
                    as: 'categoria',
                    attributes: ['id', 'nombre'],
                }],
            });

            return res.status(200).send(serializarProducto(productoCompleto));
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    list(_, res) {
        return tbb_productos
            .findAll({
                include: [{
                    model: tbc_categorias,
                    as: 'categoria',
                    attributes: ['id', 'nombre'],
                }],
            })
            .then(productos => res.status(200).send(productos.map(serializarProducto)))
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
            .findAll({
                where,
                include: [{
                    model: tbc_categorias,
                    as: 'categoria',
                    attributes: ['id', 'nombre'],
                }],
            })
            .then(productos => res.status(200).send(productos.map(serializarProducto)))
            .catch(error => res.status(400).send(error));
    },

    async update(req, res) {
        try {
            const producto = await tbb_productos.findByPk(req.params.id);

            if (!producto) {
                return res.status(404).send({
                    message: 'Producto no encontrado',
                });
            }

            const idCategoria = await resolverCategoriaId(req.body, producto.id_categoria);
            await producto.update({
                nombre: req.body.nombre ?? req.body.title ?? producto.nombre,
                descripcion: req.body.descripcion ?? req.body.description ?? producto.descripcion,
                imagen: req.body.imagen ?? req.body.image ?? producto.imagen,
                precio: req.body.precio ?? req.body.price ?? producto.precio,
                stock: req.body.stock ?? producto.stock,
                id_categoria: idCategoria,
            });

            const productoActualizado = await tbb_productos.findByPk(req.params.id, {
                include: [{
                    model: tbc_categorias,
                    as: 'categoria',
                    attributes: ['id', 'nombre'],
                }],
            });

            return res.status(200).send(serializarProducto(productoActualizado));
        } catch (error) {
            return res.status(400).send(error);
        }
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
