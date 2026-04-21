const carritoController = require('../controllers/controller_carrito');

module.exports = (app) => {
    app.get('/carritos', carritoController.list);
    app.get('/carts', carritoController.list);
    app.get('/api/carritos', carritoController.list);
    app.get('/api/carts', carritoController.list);
    app.get('/carrito/:id', carritoController.find);
    app.get('/carts/:id', carritoController.find);
    app.get('/api/carrito/:id', carritoController.find);
    app.get('/api/carts/:id', carritoController.find);
    app.post('/api/carrito', carritoController.create);
    app.post('/api/carts', carritoController.create);
    app.post('/carts', carritoController.create);
    app.delete('/api/carrito/:id', carritoController.delete);
    app.delete('/api/carts/:id', carritoController.delete);
    app.delete('/carts/:id', carritoController.delete);
    app.put('/api/carrito/:id', carritoController.update);
    app.put('/api/carts/:id', carritoController.update);
    app.put('/carts/:id', carritoController.update);
}
