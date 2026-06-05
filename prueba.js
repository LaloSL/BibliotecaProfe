// prueba.js
const sequelize = require('./db');

console.log('Paso 1: Importando db...');
console.log('sequelize:', sequelize ? '✅ Existe' : '❌ Es undefined');
console.log('Tipo:', typeof sequelize);

async function test() {
  try {
    console.log('Paso 2: Probando conexión...');
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a PostgreSQL');
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

test();