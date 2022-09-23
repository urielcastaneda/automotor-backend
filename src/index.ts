// Importamos el servidor de Express
import app from './app';
// Importamos el servidor de Socket IO
import { Server as WebSocketServer } from "socket.io";
// Importamos HTTP
import http from 'http';
// Importamos toda la funcionalidad soket
import socketIo from './socket.io';

const main = async () => {
    // Puerto por el que corre el servidor
    const port = app.get('port');
    // Creamos el servidor socket
    const Server = http.createServer(app);
    // Creamos la constante httpServer con el inicio del servidor
    const httpServer = await Server.listen(port);
    // Obtenemos el servidor Socket Io
    const io = new WebSocketServer(httpServer, {
        cors: {
            origin: true,
            credentials: true,
            methods: ["GET", "POST"]
        }
    });
    // Ejecutamos las funcionalidades
    socketIo(io);

    console.log("Listening on Port", port);
}

main();