const productoController = require('../controllers/controller_producto');

module.exports = (app) => {
    app.get('/productos', productoController.list);
    app.get('/api/productos', productoController.list);
    app.get('/producto/:id', productoController.find);
    app.get('/api/producto/:id', productoController.find);
    app.post('/api/producto', productoController.create);
    app.delete('/api/producto/:id', productoController.delete);
    app.put('/api/producto/:id', productoController.update);
}
