// Requerimos los modelos para que se sincronicen forzadamente desde app.js
//require('./Libro');
//require('./Usuario');
//require('./Prestamo');

// models/sync.js
const sequelize = require('./db');

// Importar modelos aquí
// const Usuario = require('./Usuario');
// const Libro = require('./Libro');
// const Prestamo = require('./Prestamo');

// Sincronizar
sequelize.sync({ alter: true })
  .then(() => console.log('Modelos sincronizados'))
  .catch(err => console.error('Error al sincronizar:', err));

module.exports = sequelize;