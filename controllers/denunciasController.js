const Denuncia = require('../models/Denuncia');
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');

// ======================================
// MOSTRAR FORMULARIO DE DENUNCIA
// ======================================

async function formulario(req, res) {
  try {

    const { publicacionId } = req.params;

    const publicacion = await Publicacion.findByPk(publicacionId, {
      include: [
        {
          model: Usuario
        }
      ]
    });

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrada');
    }

    res.render('denuncia', {
      title: 'Denunciar publicación',
      publicacion
    });

  } catch (error) {

    console.error(
      'Error al cargar formulario de denuncia:',
      error
    );

    res.status(500).send(
      'Error al cargar formulario de denuncia'
    );
  }
}

// ======================================
// GUARDAR DENUNCIA
// ======================================

async function guardar(req, res) {
  try {

    const { publicacionId } = req.params;

    const {
      motivo,
      descripcion
    } = req.body;

    const usuarioId = req.session.userId;

    // ======================================
    // VALIDAR SESIÓN
    // ======================================

    if (!usuarioId) {
      return res.redirect('/login');
    }

    const publicacion =
      await Publicacion.findByPk(publicacionId);

    if (!publicacion) {
      return res.status(404).send(
        'Publicación no encontrada'
      );
    }

    // ======================================
    // VALIDAR DATOS
    // ======================================

    if (!motivo || !descripcion) {

      return res.render('denuncia', {
        title: 'Denunciar publicación',
        publicacion,
        error:
          'Debe completar el motivo y la descripción de la denuncia'
      });
    }

    // ======================================
    // EVITAR DOBLE DENUNCIA
    // ======================================

    const denunciaExistente =
      await Denuncia.findOne({

        where: {
          usuarioId,
          publicacionId
        }

      });

    if (denunciaExistente) {

      return res.status(400).send(
        'Ya realizaste una denuncia sobre esta publicación'
      );
    }

    // ======================================
    // CREAR DENUNCIA
    // ======================================

    await Denuncia.create({

      motivo,
      descripcion,
      usuarioId,
      publicacionId,
      estado: 'pendiente'

    });

    // ======================================
    // CONTAR DENUNCIAS
    // ======================================

    const denuncias =
      await Denuncia.findAll({

        where: {
          publicacionId
        }

      });

    const cantidadDenuncias =
      denuncias.length;

    // ======================================
    // PASAR PUBLICACIÓN A REVISIÓN
    // ======================================

    if (cantidadDenuncias >= 3) {

      await Publicacion.update(

        {
          estadoPublicacion: 'en_revision'
        },

        {
          where: {
            id: publicacionId
          }
        }
      );
    }

    res.redirect('/');

  } catch (error) {

    console.error(
      'Error al guardar denuncia:',
      error
    );

    res.status(500).send(
      'Error al guardar denuncia'
    );
  }
}

module.exports = {
  formulario,
  guardar
};