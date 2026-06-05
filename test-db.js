// test-db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log('🔍 Probando conexión a Neon...');
console.log('DATABASE_URL existe?', !!process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

async function test() {
  try {
    await sequelize.authenticate();
    console.log('✅ CONEXIÓN EXITOSA a Neon!');
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR de conexión:', error.message);
    process.exit(1);
  }
}

test();
