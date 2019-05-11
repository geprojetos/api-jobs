const express   = require('express');
const app       = express();
const server    = require('http').Server(app);
const io        = require('socket.io');
const consign   = require('consign');
const port      = process.env.PORT || 3001;

app.use((req, res, next) => {

    req.io = io;

    return next();
});

consign({ cwd: 'src' })
    .include()
    .into(app);

server.listen(port, () => {

    if(port === 3001) {
        console.log('Servidor local rodando em http://localhost:3001');
    };
});