const Comentario = require('../models/Comentario');
const Valoracion = require('../models/Valoracion');
const Usuario = require('../models/Usuario');
const Publicacion = require('../models/Publicacion');
const Archivo = require('../models/Archivo');

// ======================================
// COMENTARIOS RECIBIDOS
// ======================================

async function comentariosRecibidos(req, res) {
  try {
    const usuarioId = req.session.userId;

    const comentarios = await Comentario.findAll({
      include: [
        {
          model: Usuario
        },
        {
          model: Publicacion
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const comentariosFiltrados = comentarios.filter(c => {
      return (
        c.Publicacion &&
        c.Publicacion.usuarioId === usuarioId
      );
    });

    res.render('comentariosRecibidos', {
      comentarios: comentariosFiltrados
    });

  } catch (error) {
    console.error('Error al cargar comentarios recibidos:', error);
    res.status(500).send('Error al cargar comentarios recibidos');
  }
}

// ======================================
// VALORACIONES RECIBIDAS
// ======================================

async function valoracionesRecibidas(req, res) {
  try {
    const usuarioId = req.session.userId;

    const valoraciones = await Valoracion.findAll({
      include: [
        {
          model: Usuario
        },
        {
          model: Archivo,
          include: [
            {
              model: Publicacion
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const valoracionesFiltradas = valoraciones.filter(v => {
      return (
        v.Archivo &&
        v.Archivo.Publicacion &&
        v.Archivo.Publicacion.usuarioId === usuarioId
      );
    });

    res.render('valoracionesRecibidas', {
      valoraciones: valoracionesFiltradas
    });

  } catch (error) {
    console.error('Error al cargar valoraciones recibidas:', error);
    res.status(500).send('Error al cargar valoraciones recibidas');
  }
}

module.exports = {
  comentariosRecibidos,
  valoracionesRecibidas
};