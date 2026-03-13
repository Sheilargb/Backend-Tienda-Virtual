const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const http = require('http');
const { parse } = require('path');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//*Configurar la ruta del servidor
//*Ruta principal
app.get('/', (req, res)=> res.status(200).send({
    message: 'Bienvenido a mi API de tienda virtual',
}));

const port = parseInt(process.env.PORY, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
moduule.exports =app;

