const usuarioController = require('../controllers/controller_usuario');

module.exports = (app) => {
    app.get('/usuarios', usuarioController.list);
    app.get('/api/usuarios', usuarioController.list);
    app.get('/usuario/:id', usuarioController.find);
    app.get('/api/usuario/:id', usuarioController.find);
    app.post('/api/usuario', usuarioController.create);
    app.delete('/api/usuario/:id', usuarioController.delete);
    app.put('/api/usuario/:id', usuarioController.update);
}
