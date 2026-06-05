// test-simple.js
console.log('1. Intentando cargar db.js...');

try {
  const sequelize = require('./db');
  console.log('2. db.js cargado correctamente');
  console.log('3. sequelize es:', sequelize ? 'un objeto' : 'undefined');
  
  if (sequelize) {
    console.log('4. Tipo:', typeof sequelize);
    console.log('5. Tiene método define?', typeof sequelize.define === 'function' ? 'SI' : 'NO');
  }
} catch (error) {
  console.error('ERROR:', error.message);
  console.error(error.stack);
}