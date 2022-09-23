// Requerimos Moongose
import mongoose, { ConnectOptions } from "mongoose";

// Requerimos la dirección del servidor de MongoDB
import env from './config';

class Mongo {
    connection: null = null;
    connect() {
        if (this.connection) return this.connection;
        return mongoose.connect(`${env.MONGODB_URI}`, <ConnectOptions>{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then((connection: any) => {
            this.connection = connection;
            console.log('Conexion a MongoDB');
        })
        .catch(error => console.error(error));
    }
}

export default Mongo;