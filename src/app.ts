import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Obtenemos las variables de configuraciones
import env from './config/config';
// Obtenemos la conexion a la base de datos
import Mongo from './config/database';

// Nos conectamos a la base de datos
new Mongo().connect();

const app = express(); // Ejecutamos el servidor

// Importamos los middlewares
import tokenAuth from './middleware/token-auth.middleware';

// import indexRoutes from './routes/index';

// Settings
app.set('port', env.PORT_SERVER);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

/*
*
*   Rutas
*
*/
// Importamos las rutas ***
import Auth from './routes/auth.routes';
import accessPage from './routes/access-page.routes';
import recaptcha from './routes/recaptcha.routes';
import rol from './routes/rol.routes';
import user from './routes/user.routes';
import vehicle from './routes/vehicle.routes';
import travel from './routes/travel.routes';

// Establecemos las rutas ***
app.use('/auth', Auth); // Ruta para la autentificación del usuario
app.use('/api/recaptcha', recaptcha)
app.use('/api/access-page', tokenAuth.isLoggedIn, accessPage); // Ruta relacionada a la autorizacion de los usuarios
app.use('/api/rol', tokenAuth.isLoggedIn, rol); // Ruta relacionada a la autorizacion de los usuarios
app.use('/api/user', tokenAuth.isLoggedIn, user); // Ruta relacionada al manejo de los usuarios
app.use('/api/vehicle', tokenAuth.isLoggedIn, vehicle); // Ruta relacionada al manejo de los vehiculos
app.use('/api/travel', travel); // Ruta relacionada al manejo de los viajes

// Este folder se usara para el almacenamiento de archivos publicos
// app.use('/uploads', express.static(path.resolve('uploads')));

export default app;