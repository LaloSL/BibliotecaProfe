const Valoracion = require('../models/Valoracion');
const Archivo = require('../models/Archivo');
const Publicacion = require('../models/Publicacion');

async function guardar(req, res) {

  try {

    // ===============================
    // OBTENER DATOS
    // ===============================

    const { archivoId } = req.params;
    const { valor } = req.body;

    const usuarioId = req.session.userId;

    // ===============================
    // VALIDAR USUARIO LOGUEADO
    // ===============================

    if (!usuarioId) {

      return res.status(401).send('Debes iniciar sesión');
    }

    // ===============================
    // VALIDAR ARCHIVO
    // ===============================

    const archivo = await Archivo.findByPk(archivoId, {

      include: [
        {
          model: Publicacion
        }
      ]

    });

    if (!archivo) {

      return res.status(404).send('Archivo no encontrado');
    }

    // ===============================
    // VALIDAR SI ES EL DUEÑO
    // ===============================

    if (
      archivo.Publicacion &&
      archivo.Publicacion.usuarioId === usuarioId
    ) {

      return res.status(403).send(
        'No podés valorar tu propia publicación'
      );
    }

    // ===============================
    // VALIDAR RANGO
    // ===============================

    if (valor < 1 || valor > 5) {

      return res.status(400).send('Valor inválido');
    }

    // ===============================
    // VERIFICAR SI YA VALORÓ
    // ===============================

    const valoracionExistente = await Valoracion.findOne({

      where: {
        usuarioId: usuarioId,
        archivoId: archivoId
      }

    });

    // ===============================
    // ACTUALIZAR VALORACIÓN
    // ===============================

    if (valoracionExistente) {

      req.session.errorValoracion =
        'Ya valoraste esta imagen. No podés volver a valorarla.';

      return res.redirect('/');

    } else {

      // ===============================
      // CREAR NUEVA VALORACIÓN
      // ===============================

      await Valoracion.create({

        valor: valor,
        usuarioId: usuarioId,
        archivoId: archivoId

      });

      console.log('Valoración creada');
    }

    // ===============================
    // VOLVER AL HOME
    // ===============================

    res.redirect('/');

  } catch (error) {

    console.error('Error al guardar valoración:', error);

    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  guardar
};