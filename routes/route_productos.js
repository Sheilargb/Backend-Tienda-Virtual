const productoController = require('../controllers/controller_producto');

module.exports = (app) => {
    app.get('/productos', productoController.list);
    app.get('/products', productoController.list);
    app.get('/api/productos', productoController.list);
    app.get('/api/products', productoController.list);
    app.get('/producto/:id', productoController.find);
    app.get('/products/:id', productoController.find);
    app.get('/api/producto/:id', productoController.find);
    app.get('/api/products/:id', productoController.find);
    app.post('/api/producto', productoController.create);
    app.post('/api/products', productoController.create);
    app.post('/products', productoController.create);
    app.delete('/api/producto/:id', productoController.delete);
    app.delete('/api/products/:id', productoController.delete);
    app.delete('/products/:id', productoController.delete);
    app.put('/api/producto/:id', productoController.update);
    app.put('/api/products/:id', productoController.update);
    app.put('/products/:id', productoController.update);
}
