const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );

        this.paths = { }

        // Middlewares
        this.middlewares();
        
        // Application routes
        this.routes();

        // Sockets configuration
        this.sockets();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Public folder
        this.app.use( express.static( 'public' ) );

    }

    routes() {
        
        // this.app.use( this.paths.auth, require('../routes/auth'));

    }

    sockets() {

        this.io.on('connection', socket => {

            socket.on('disconnect', () => {
                console.log('Client disconnected', socket.id );
            });

            socket.on('send-message', ( payload ) => {
                
                this.io.emit('send-message', payload );

            });

        });

    }

    listen() {
        this.server.listen( this.port, () => {
            console.log( 'Server running in port:', this.port );
        });
    }

}


module.exports = Server;