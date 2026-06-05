// test-models.js
console.log('1. Intentando cargar models/db.js...');

try {
  const sequelize = require('./models/db');
  console.log('2. ✅ db.js cargado correctamente');
  console.log('3. sequelize es:', sequelize ? 'un objeto' : 'undefined');
  
  if (sequelize) {
    console.log('4. Tipo:', typeof sequelize);
    console.log('5. Tiene método define?', typeof sequelize.define === 'function' ? '✅ SI' : '❌ NO');
    console.log('6. Tiene método authenticate?', typeof sequelize.authenticate === 'function' ? '✅ SI' : '❌ NO');
  }
} catch (error) {
  console.error('❌ ERROR:', error.message);
}

console.log('\n7. Intentando cargar models/Usuario.js...');
try {
  const Usuario = require('./models/Usuario');
  console.log('8. ✅ Usuario.js cargado correctamente');
  console.log('9. Usuario es:', typeof Usuario);
} catch (error) {
  console.error('❌ ERROR al cargar Usuario:', error.message);
}