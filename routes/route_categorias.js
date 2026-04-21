const categoriaController = require('../controllers/controller_categoria'); 

module.exports = (app) => {
    app.get('/categorias', categoriaController.list);
    app.get('/categories', categoriaController.list);
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categories', categoriaController.list);
    app.get('/categoria/:id', categoriaController.find);
    app.get('/categories/:id', categoriaController.find);
    app.get('/api/categoria/:id', categoriaController.find);
    app.get('/api/categories/:id', categoriaController.find);
    app.post('/api/categoria', categoriaController.create);
    app.post('/api/categories', categoriaController.create);
    app.post('/categories', categoriaController.create);
    app.delete('/api/categoria/:id', categoriaController.delete);
    app.delete('/api/categories/:id', categoriaController.delete);
    app.delete('/categories/:id', categoriaController.delete);
    app.put('/api/categoria/:id', categoriaController.update);
    app.put('/api/categories/:id', categoriaController.update);
    app.put('/categories/:id', categoriaController.update);
}
