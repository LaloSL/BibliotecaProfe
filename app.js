require('dotenv').config();

// ===============================
// DEPENDENCIAS PRINCIPALES
// ===============================

const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

// ===============================
// BASE DE DATOS
// ===============================

const sequelize = require('./models/db');
require('./models/sync'); // Sincronizar explícitamente los modelos

// ===============================
// MIDDLEWARES PERSONALIZADOS
// ===============================

const {
  getCurrentUser
} = require('./middleware/auth');

// ===============================
// PUERTO
// ===============================

const PORT = process.env.PORT || 3000;

// ===============================
// RUTAS - NÚCLEO
// ===============================

const indexRoutes = require('./routes/index');
const usuariosRoutes = require('./routes/usuarios');
const administradorRoutes = require('./routes/admin');

// ===============================
// RUTAS - BIBLIOTECA
// ===============================

const librosRoutes = require('./routes/libros');
const prestamosRoutes = require('./routes/prestamos');

// ===============================
// RUTAS - CUENTA / USUARIO
// ===============================

const recuperarRoutes = require('./routes/recuperar');
const modificarRoutes = require('./routes/modiContra');

// ===============================
// RUTAS - PUBLICACIONES
// ===============================

const subirRoutes = require('./routes/subirRoutes');
const publicacionesRoutes = require('./routes/publicacionesRoutes');

const etiquetasRoutes = require('./routes/etiquetas');
const publicarEtiquetasRoutes = require('./routes/publicarEtiquetas');
const moderacionRoutes = require('./routes/moderacion');
const coleccionesRoutes = require('./routes/colecciones');

// ===============================
// RUTAS - INTERACCIONES
// ===============================

const likesRoutes = require('./routes/like');
const comentariosRoutes = require('./routes/comentarios');
const valoracionesRoutes = require('./routes/valoracion');
const denunciasRoutes = require('./routes/denuncias');
const denunciasComentariosRoutes = require('./routes/denunciasComentarios');
const notificacionesRoutes = require('./routes/notificaciones');

// ===============================
// RUTAS - INTERESES
// ===============================

const interesesRoutes = require('./routes/intereses');
const interesadosRoutes = require('./routes/interesados');

// ===============================
// RUTAS - MENSAJERÍA
// ===============================

const mensajesRoutes = require('./routes/mensajes');

// ===============================
// CONFIGURACIÓN PUG
// ===============================

app.set('view engine', 'pug');

app.set(
  'views',
  path.join(__dirname, 'views')
);

// ===============================
// CONFIGURACIÓN DE SESIONES
// ===============================

app.use(
  session({

    secret:
      process.env.SESSION_SECRET ||
      'biblioteca-secret-key',

    resave: false,

    saveUninitialized: false,

    cookie: {

      secure: false,

      maxAge:
        24 * 60 * 60 * 1000

    }

  })
);

// ===============================
// MIDDLEWARES GENERALES
// ===============================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  express.static('public')
);

app.use(getCurrentUser);

// ===============================
// MONTAJE DE RUTAS - NÚCLEO
// ===============================

app.use('/', indexRoutes);

app.use('/usuarios', usuariosRoutes);

app.use(
  '/administrador',
  administradorRoutes
);

// ===============================
// MONTAJE DE RUTAS - BIBLIOTECA
// ===============================

app.use('/libros', librosRoutes);

app.use('/prestamos', prestamosRoutes);

// ===============================
// MONTAJE DE RUTAS - CUENTA
// ===============================

console.log('Montando ruta /recuperar');

app.use('/recuperar', recuperarRoutes);

app.use('/modiContra', modificarRoutes);

// ===============================
// MONTAJE DE RUTAS - PUBLICACIONES
// ===============================

app.use('/subir', subirRoutes);
app.use('/publicaciones', publicacionesRoutes);
app.use('/etiquetas', etiquetasRoutes);
app.use('/publicarEtiquetas', publicarEtiquetasRoutes);
app.use('/moderacion', moderacionRoutes);
app.use('/colecciones', coleccionesRoutes);

// ===============================
// MONTAJE DE RUTAS - INTERACCIONES
// ===============================

app.use('/likes', likesRoutes);

app.use('/comentarios', comentariosRoutes);

app.use('/valoraciones', valoracionesRoutes);

app.use('/denuncias', denunciasRoutes);
app.use('/denuncias-comentarios', denunciasComentariosRoutes);
app.use('/notificaciones', notificacionesRoutes);

// ===============================
// MONTAJE DE RUTAS - INTERESES
// ===============================

app.use('/intereses', interesesRoutes);

app.use('/interesados', interesadosRoutes);

// ===============================
// MONTAJE DE RUTAS - MENSAJERÍA
// ===============================

app.use('/mensajes', mensajesRoutes);

// ===============================
// INICIO DEL SERVIDOR
// ===============================

sequelize.sync()

  .then(() => {

    console.log(
      'Modelos sincronizados'
    );

    app.listen(
      PORT,
      '::',
      () => {

        console.log(
          `Servidor iniciado en http://localhost:${PORT}`
        );

      }
    );

  })

  .catch((err) => {

    console.error(
      'Error al sincronizar modelos:',
      err
    );

  });

// ===============================
// DEPENDENCIAS UTILIZADAS
// ===============================

// npm install express sequelize mysql2 multer express-session pug bcrypt dotenv sharp
//npm install pg pg-hstore
//npm uninstall mysql2