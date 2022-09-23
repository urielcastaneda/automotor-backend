//
import TravelCtrl from "./controller/travel.controller";

export default (io: any) => {
    // Middlewares para socket
    /*
    io.use((socket: any, next: any) => {
        console.log(socket);
        next();
    })
    */

    io.on('connection', (socket: any) => {
        // Escuchamos la peticion para en listar todos los viajes
        socket.on('client:list-travel', async () => {
            // En listamos todos los viajes
            const listTravels = await TravelCtrl.listAll(); // Obtenemos la lista
            // Emitimos
            socket.emit('server:list-travel', listTravels);
        });
        socket.on('client:create-travel', async (travel: any) => {
            console.log(travel);
        })
    });
}