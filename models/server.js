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

    listen() {
        this.server.listen( this.port, () => {
            console.log( 'Server running in port:', this.port );
        });
    }

}


module.exports = Server;