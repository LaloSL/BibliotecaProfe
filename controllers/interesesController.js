const Interes = require('../models/Interes');
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const Archivo = require('../models/Archivo');

// ======================================
// GUARDAR INTERÉS
// ======================================

async function guardar(req, res) {

  try {

    // ======================================
    // OBTENER DATOS
    // ======================================

    const { publicacionId } = req.params;

    const usuarioInteresadoId = req.session.userId;

    // ======================================
    // VALIDAR PUBLICACIÓN
    // ======================================

    const publicacion = await Publicacion.findByPk(publicacionId);

    if (!publicacion) {

      return res.status(404).send(
        'Publicación no encontrada'
      );
    }

    // ======================================
    // VALIDAR SI ES EL DUEÑO
    // ======================================
    // el mismo usuario no puede marcar interés en su propia publicación
    if (publicacion.usuarioId === usuarioInteresadoId) {

      return res.status(403).send(
        'No puedes interesarte en tu propia publicación'
      );
    }

    // ======================================
    // VALIDAR SI YA EXISTE INTERÉS
    // ======================================
    // un usuario no puede marcar interés más de una vez en la misma publicación
    const interesExistente = await Interes.findOne({

      where: {
        usuarioInteresadoId,
        publicacionId
      }

    });

    if (interesExistente) {

      return res.status(400).send(
        'Ya marcaste interés en esta publicación'
      );
    }

    // ======================================
    // CREAR INTERÉS
    // ======================================

    await Interes.create({

      usuarioInteresadoId,
      publicacionId

    });

    console.log('Interés registrado');

    // ======================================
    // REDIRECCIONAR
    // ======================================

    res.redirect('/');

  } catch (error) {

    console.error(
      'Error al registrar interés:',
      error
    );

    res.status(500).send(
      'Error interno del servidor'
    );
  }
}

// ======================================
// LISTAR INTERESES RECIBIDOS
// ======================================

async function listar(req, res) {

  try {

    const usuarioId = req.session.userId;

    // ======================================
    // BUSCAR INTERESES
    // ======================================

    const intereses = await Interes.findAll({

      include: [

        {
          model: Usuario,
          as: 'usuarioInteresado'
        },

        {
          model: Publicacion,
          include: [
            {
              model: Archivo
            }
          ]
        }

      ]

    });

    // ======================================
    // FILTRAR SOLO MIS PUBLICACIONES
    // ======================================
    //
    const interesesFiltrados = intereses.filter(
      interes =>
        interes.Publicacion &&
        interes.Publicacion.usuarioId === usuarioId
    );

    // ======================================
    // RENDERIZAR VISTA
    // ======================================

    res.render('interesados', {

      intereses: interesesFiltrados,

      currentUser: {
        id: req.session.userId,
        nombre: req.session.nombre,
        rol: req.session.rol
      }

    });

  } catch (error) {

    console.error(
      'Error al listar intereses:',
      error
    );

    res.status(500).send(
      'Error interno del servidor'
    );
  }
}

module.exports = {
  guardar,
  listar
};