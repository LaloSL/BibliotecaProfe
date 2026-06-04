const Publicacion = require('../models/Publicacion');

// ======================================
// MODIFICAR ESTADO DE COMENTARIOS
// ======================================

async function modificarEstadoComentarios(req, res) {

  try {

    // ======================================
    // OBTENER ID DE LA PUBLICACIÓN
    // ======================================

    const publicacionId = req.params.id;

    // ======================================
    // OBTENER USUARIO LOGUEADO
    // ======================================

    const usuarioId = req.session.userId;

    // ======================================
    // BUSCAR PUBLICACIÓN
    // ======================================

    const publicacion = await Publicacion.findByPk(publicacionId);

    // ======================================
    // VALIDAR SI EXISTE
    // ======================================

    if (!publicacion) {

      return res.status(404).send('Publicación no encontrada');
    }

    // ======================================
    // VALIDAR SI EL USUARIO ES EL DUEÑO
    // ======================================

    if (publicacion.usuarioId !== usuarioId) {

      return res.status(403).send('No tienes permiso para modificar esta publicación');
    }

    // ======================================
    // CAMBIAR ESTADO DE COMENTARIOS
    // ======================================

    publicacion.comentarios_habilitados =
      !publicacion.comentarios_habilitados;

    // ======================================
    // GUARDAR CAMBIOS
    // ======================================

    await publicacion.save();

    // ======================================
    // REDIRECCIONAR AL HOME
    // ======================================

    res.redirect('/');

  } catch (error) {

    console.error('Error al modificar estado de comentarios:', error);

    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  modificarEstadoComentarios
};