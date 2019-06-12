const express   = require('express');
const app       = express();
const server    = require('http').Server(app);
const io        = require('socket.io')(server);
const consign   = require('consign');
const bodyParser= require('body-parser');
const cors      = require('cors');
const port      = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    
    req.io = io;
    return next();
});

consign({ cwd: 'src' })
    .include('config')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app);

server.listen(port, () => {

    if(port === 3001) {
        console.log('Servidor local rodando em http://localhost:3001');
        return;
    };

    console.log('Servidor remoto rodando');
});