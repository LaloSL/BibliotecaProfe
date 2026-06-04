const sequelize = require('../models/db');
const Usuario = require('../models/Usuario');
const Libro = require('../models/Libro');
const Prestamo = require('../models/Prestamo');
const bcrypt = require('bcrypt');

async function seed() {
  await sequelize.sync({ force: true });

  // Generar password encriptado
  const passwordHash = await bcrypt.hash('1234', 10);

  // Usuarios
  const usuarios = await Usuario.bulkCreate([
    { nombre: 'Juan Pérez', email: 'juan@example.com', dni: 12345678, password: passwordHash, rol: 'admin' },
    { nombre: 'Ana Gómez', email: 'ana@example.com', dni: 23456789, password: passwordHash, rol: 'usuario' },
    { nombre: 'Carlos Ruiz', email: 'carlos@example.com', dni: 34567890, password: passwordHash, rol: 'usuario' },
    { nombre: 'María López', email: 'maria@example.com', dni: 45678901, password: passwordHash, rol: 'usuario' }
  ]);

  // Libros
  const libros = await Libro.bulkCreate([
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio_publicacion: 1967, categoria: 'Novela', isbn: '9780307474728' },
    { titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', anio_publicacion: 1943, categoria: 'Fábula', isbn: '9780156013987' },
    { titulo: 'Rayuela', autor: 'Julio Cortázar', anio_publicacion: 1963, categoria: 'Novela', isbn: '9788437602210' },
    { titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', anio_publicacion: 1997, categoria: 'Fantasía', isbn: '9788478884452' },
    { titulo: 'Harry Potter y la cámara secreta', autor: 'J.K. Rowling', anio_publicacion: 1998, categoria: 'Fantasía', isbn: '9788478884957' },
    { titulo: 'Harry Potter y el prisionero de Azkaban', autor: 'J.K. Rowling', anio_publicacion: 1999, categoria: 'Fantasía', isbn: '9788478885190' },
    { titulo: 'Harry Potter y el cáliz de fuego', autor: 'J.K. Rowling', anio_publicacion: 2000, categoria: 'Fantasía', isbn: '9788478886456' },
    { titulo: 'Harry Potter y la Orden del Fénix', autor: 'J.K. Rowling', anio_publicacion: 2003, categoria: 'Fantasía', isbn: '9788478887347' },
    { titulo: 'Harry Potter y el misterio del príncipe', autor: 'J.K. Rowling', anio_publicacion: 2005, categoria: 'Fantasía', isbn: '9788478889907' },
    { titulo: 'Harry Potter y las Reliquias de la Muerte', autor: 'J.K. Rowling', anio_publicacion: 2007, categoria: 'Fantasía', isbn: '9788498381405' },
    { titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', anio_publicacion: 1937, categoria: 'Fantasía', isbn: '9788445071972' },
    { titulo: 'El eternauta', autor: 'Jorge Luis Borges', anio_publicacion: 1944, categoria: 'Cuento', isbn: '9789871138011' },
    { titulo: 'Una historia de dos ciudades', autor: 'Charles Dickens', anio_publicacion: 1859, categoria: 'Novela', isbn: '9788491050292' },
    { titulo: 'Game of Thrones', autor: 'George R.R. Martin', anio_publicacion: 1996, categoria: 'Fantasía', isbn: '9780553103540' },
  ]);

  // Préstamos
  await Prestamo.bulkCreate([
    { usuarioId: usuarios[0].id, libroId: libros[0].id, fecha_prestamo: new Date(), fecha_devolucion: null },
    { usuarioId: usuarios[0].id, libroId: libros[1].id, fecha_prestamo: new Date(), fecha_devolucion: null },
    { usuarioId: usuarios[0].id, libroId: libros[2].id, fecha_prestamo: new Date(), fecha_devolucion: null },
    { usuarioId: usuarios[1].id, libroId: libros[1].id, fecha_prestamo: new Date(), fecha_devolucion: null },
    { usuarioId: usuarios[2].id, libroId: libros[2].id, fecha_prestamo: new Date(), fecha_devolucion: null }
  ]);

  console.log('Datos de prueba insertados');
  process.exit();
}

seed()
  .then(() => {
    console.log('Datos insertados correctamente');
    process.exit();
  })
  .catch((error) => {
    console.error('Error al ejecutar seed:', error);
    process.exit(1);
  });