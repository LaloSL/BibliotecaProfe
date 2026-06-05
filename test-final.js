// test-final.js
const sequelize = require('./models/db');
const Usuario = require('./models/Usuario');

async function test() {
  console.log('\n=== PROBANDO CONEXIÓN COMPLETA ===\n');
  
  try {
    // 1. Probar conexión a PostgreSQL
    console.log('1. Probando conexión a la base de datos...');
    await sequelize.authenticate();
    console.log('   ✅ Conexión exitosa a PostgreSQL\n');
    
    // 2. Sincronizar el modelo Usuario
    console.log('2. Sincronizando modelo Usuario...');
    await Usuario.sync({ force: false });
    console.log('   ✅ Tabla "usuarios" sincronizada\n');
    
    // 3. Contar usuarios existentes
    const cantidad = await Usuario.count();
    console.log(`3. Usuarios existentes en la base de datos: ${cantidad}\n`);
    
    // 4. Probar crear un usuario con datos ÚNICOS
    console.log('4. Probando crear un usuario de prueba...');
    const usuarioPrueba = await Usuario.create({
      nombre: 'Usuario Test 2',
      email: 'test2@example.com',  // ← email diferente
      dni: 87654321,               // ← DNI diferente
      password: 'password123',
      rol: 'usuario',
      estado: 'activo'
    });
    console.log('   ✅ Usuario creado con ID:', usuarioPrueba.id, '\n');
    
    // 5. Probar buscar usuario
    console.log('5. Probando buscar usuario...');
    const usuarioEncontrado = await Usuario.findOne({
      where: { email: 'test2@example.com' }
    });
    console.log('   ✅ Usuario encontrado:', usuarioEncontrado.nombre, '\n');
    
    // 6. Probar validar password
    console.log('6. Probando validar password...');
    const passwordValida = await usuarioEncontrado.validarPassword('password123');
    console.log('   ✅ ¿Password válida?', passwordValida, '\n');
    
    // 7. Mostrar todos los usuarios
    console.log('7. Lista de usuarios en la base de datos:');
    const todos = await Usuario.findAll();
    todos.forEach(u => {
      console.log(`   - ID: ${u.id}, Nombre: ${u.nombre}, Email: ${u.email}`);
    });
    
    console.log('\n=== ✅ TODAS LAS PRUEBAS PASARON ===');
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

test();