const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const Archivo = require('../models/Archivo');
const Denuncia = require('../models/Denuncia');

// ======================================
// LISTAR PUBLICACIONES EN REVISIÓN
// ======================================

async function listar(req, res) {
  try {

    const publicaciones =
      await Publicacion.findAll({

        where: {
          estadoPublicacion: 'en_revision'
        },

        include: [
          {
            model: Usuario
          },
          {
            model: Archivo
          },
          {
            model: Denuncia
          }
        ],

        order: [['id', 'DESC']]

      });

    res.render('moderacion', {
      publicaciones
    });

  } catch (error) {

    console.error(
      'Error al cargar moderación:',
      error
    );

    res.status(500).send(
      'Error al cargar moderación'
    );
  }
}

// ======================================
// VEREDICTO DEL ADMINISTRADOR
// ======================================

async function veredicto(req, res) {
  try {

    const { publicacionId } = req.params;

    const { accion } = req.body;

    const publicacion =
      await Publicacion.findByPk(publicacionId, {

        include: [
          {
            model: Usuario
          }
        ]

      });

    if (!publicacion) {

      return res.status(404).send(
        'Publicación no encontrada'
      );
    }

    // ======================================
    // DESDESTIMAR DENUNCIAS
    // ======================================

    if (accion === 'desestimar') {

      await Publicacion.update(

        {
          estadoPublicacion: 'activa'
        },

        {
          where: {
            id: publicacionId
          }
        }
      );
    }

    // ======================================
    // DAR DE BAJA PUBLICACIÓN
    // ======================================

    if (accion === 'bajada') {

      await Publicacion.update(

        {
          estadoPublicacion: 'bajada'
        },

        {
          where: {
            id: publicacionId
          }
        }
      );

      // ======================================
      // CONTAR PUBLICACIONES BAJADAS
      // ======================================

      const publicacionesBajadas =
        await Publicacion.findAll({

          where: {
            usuarioId: publicacion.usuarioId,
            estadoPublicacion: 'bajada'
          }

        });

      const cantidadBajadas =
        publicacionesBajadas.length;

      // ======================================
      // DESACTIVAR USUARIO
      // ======================================

      if (cantidadBajadas >= 3) {

        await Usuario.update(

          {
            estado: 'inactivo'
          },

          {
            where: {
              id: publicacion.usuarioId
            }
          }
        );
      }
    }

    res.redirect('/moderacion');

  } catch (error) {

    console.error(
      'Error al aplicar veredicto:',
      error
    );

    res.status(500).send(
      'Error al aplicar veredicto'
    );
  }
}

module.exports = {
  listar,
  veredicto
};