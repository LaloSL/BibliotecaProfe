const Libro = require('../models/Libro');

async function listar(req, res) {
  try {
    const libros = await Libro.findAll();
    res.render('libros/lista', { libros });
  } catch (error) {
    console.error(error);
    res.status(500).render('libros/lista', {
      error: 'Error al listar libros'
    });
  }
}

async function formulario(req, res) {
  res.render('libros/formulario');
}

async function crear(req, res) {
  const libro = req.body;
  // Validamos campos
  if (!libro.titulo || !libro.autor || !libro.isbn || !libro.categoria) {
    return res.status(400).render('libros/formulario', {
      error: 'Todos los campos son obligatorios'
    });
  }

  try {
    // Validar que el libro no exista
    const libroExistente = await Libro.findOne({ where: { isbn: libro.isbn } });
    if (libroExistente) {
      return res.status(400).render('libros/formulario', {
        error: 'El libro ya existe'
      });
    }
    await Libro.create(libro);
    res.redirect('/libros');
  } catch (error) {
    console.log(error);
    res.status(500).render('libros/formulario', {
      error: 'Error al crear el libro'
    });
  }
}

module.exports = {
  listar,
  formulario,
  crear
};
