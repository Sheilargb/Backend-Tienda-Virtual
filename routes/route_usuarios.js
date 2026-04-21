const usuarioController = require('../controllers/controller_usuario');

module.exports = (app) => {
    app.get('/usuarios', usuarioController.list);
    app.get('/users', usuarioController.list);
    app.get('/api/usuarios', usuarioController.list);
    app.get('/api/users', usuarioController.list);
    app.get('/usuario/:id', usuarioController.find);
    app.get('/users/:id', usuarioController.find);
    app.get('/api/usuario/:id', usuarioController.find);
    app.get('/api/users/:id', usuarioController.find);
    app.post('/api/usuario', usuarioController.create);
    app.post('/api/users', usuarioController.create);
    app.post('/users', usuarioController.create);
    app.delete('/api/usuario/:id', usuarioController.delete);
    app.delete('/api/users/:id', usuarioController.delete);
    app.delete('/users/:id', usuarioController.delete);
    app.put('/api/usuario/:id', usuarioController.update);
    app.put('/api/users/:id', usuarioController.update);
    app.put('/users/:id', usuarioController.update);
}
