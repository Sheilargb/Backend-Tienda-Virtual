const detalleCarritoController = require('../controllers/controller_detalle_carrito');

module.exports = (app) => {
    app.get('/detalles_carrito', detalleCarritoController.list);
    app.get('/api/detalles_carrito', detalleCarritoController.list);
    app.get('/detalle_carrito/:id', detalleCarritoController.find);
    app.get('/api/detalle_carrito/:id', detalleCarritoController.find);
    app.post('/api/detalle_carrito', detalleCarritoController.create);
    app.delete('/api/detalle_carrito/:id', detalleCarritoController.delete);
    app.put('/api/detalle_carrito/:id', detalleCarritoController.update);
}
