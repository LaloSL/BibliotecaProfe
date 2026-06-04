const Coleccion = require('../models/Coleccion');
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const Archivo = require('../models/Archivo');
const ColeccionPublicacion = require('../models/ColeccionPublicacion');

// ======================================
// LISTAR MIS COLECCIONES
// ======================================

async function listar(req, res) {
  try {
    const usuarioId = req.session.userId;

    const colecciones = await Coleccion.findAll({
      where: {
        usuarioId
      },
      order: [['createdAt', 'DESC']]
    });

    res.render('colecciones', {
      colecciones
    });

  } catch (error) {
    console.error('Error al listar colecciones:', error);
    res.status(500).send('Error al listar colecciones');
  }
}

// ======================================
// FORMULARIO NUEVA COLECCIÓN
// ======================================

async function formulario(req, res) {

  try {

    const usuarioId = req.session.userId;

    const colecciones = await Coleccion.findAll({

      where: {
        usuarioId
      },

      order: [
        ['createdAt', 'DESC']
      ]

    });

    res.render(
      'nuevaColeccion',
      {
        colecciones
      }
    );

  } catch (error) {

    console.error(
      'Error al cargar formulario:',
      error
    );

    res.status(500).send(
      'Error al cargar formulario'
    );
  }
}

// ======================================
// GUARDAR COLECCIÓN
// ======================================

async function guardar(req, res) {
  try {
    const usuarioId = req.session.userId;
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.render('nuevaColeccion', {
        error: 'Debe ingresar un nombre'
      });
    }

    const nombreLimpio = nombre.trim();

    const coleccionExistente = await Coleccion.findOne({
      where: {
        nombre: nombreLimpio,
        usuarioId
      }
    });

    if (coleccionExistente) {
      return res.render('nuevaColeccion', {
        error: 'Ya tenés una colección con ese nombre'
      });
    }

    await Coleccion.create({
      nombre: nombreLimpio,
      usuarioId
    });

    res.redirect('/colecciones');

  } catch (error) {
    console.error('Error al guardar colección:', error);
    res.status(500).send('Error al guardar colección');
  }
}

// ======================================
// VER COLECCIÓN
// ======================================

async function verColeccion(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.session.userId;

    const coleccion = await Coleccion.findOne({
      where: {
        id,
        usuarioId
      },
      include: [
        {
          model: Publicacion,
          include: [
            {
              model: Usuario
            },
            {
              model: Archivo
            }
          ]
        }
      ]
    });

    if (!coleccion) {
      return res.status(404).send('Colección no encontrada');
    }

    res.render('verColeccion', {
      coleccion
    });

  } catch (error) {
    console.error('Error al ver colección:', error);
    res.status(500).send('Error al ver colección');
  }
}

// ======================================
// AGREGAR PUBLICACIÓN A UNA COLECCIÓN
// ======================================

async function agregarPublicacion(req, res) {
  try {
    const { id, publicacionId } = req.params;
    const usuarioId = req.session.userId;

    const coleccion = await Coleccion.findOne({
      where: {
        id,
        usuarioId
      }
    });

    if (!coleccion) {
      return res.status(404).send('Colección no encontrada');
    }

    const existe = await ColeccionPublicacion.findOne({
      where: {
        coleccionId: id,
        publicacionId
      }
    });

    if (existe) {
      return res.redirect(`/colecciones/${id}`);
    }

    await ColeccionPublicacion.create({
      coleccionId: id,
      publicacionId
    });

    res.redirect(`/colecciones/${id}`);

  } catch (error) {
    console.error('Error al agregar publicación:', error);
    res.status(500).send('Error al agregar publicación');
  }
}

// ======================================
// ELIMINAR COLECCIÓN
// ======================================

async function eliminar(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.session.userId;

    const coleccion = await Coleccion.findOne({
      where: {
        id,
        usuarioId
      }
    });

    if (!coleccion) {
      return res.status(404).send('Colección no encontrada');
    }

    await ColeccionPublicacion.destroy({
      where: {
        coleccionId: id
      }
    });

    await Coleccion.destroy({
      where: {
        id,
        usuarioId
      }
    });

    res.redirect('/colecciones');

  } catch (error) {
    console.error('Error al eliminar colección:', error);
    res.status(500).send('Error al eliminar colección');
  }
}

module.exports = {
  listar,
  formulario,
  guardar,
  verColeccion,
  agregarPublicacion,
  eliminar
};