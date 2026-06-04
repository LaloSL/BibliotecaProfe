const Like = require('../models/Like');
const Usuario = require('../models/Usuario'); 
const Publicacion = require('../models/Publicacion');
const Archivo = require('../models/Archivo');


// Activa o desactiva el like de una publicación
async function toggleLike(req, res) {
  try {
    // 1. Verificamos que haya un usuario logueado
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    // 2. Tomamos el usuario actual desde la sesión
    const usuarioId = req.session.userId;

    // 3. Tomamos el id de la publicación desde la URL
    // Ejemplo: /likes/3  => publicacionId = 3
    const publicacionId = req.params.publicacionId;

    // 4. Buscamos si este usuario ya le dio like a esta publicación
    const likeExistente = await Like.findOne({
      where: {
        usuarioId: usuarioId,
        publicacionId: publicacionId
      }
    });

    // 5. Si el like ya existe, lo eliminamos
    // Esto significa: quitar like
    if (likeExistente) {
      await likeExistente.destroy();
      return res.redirect('/');
    }

    // 6. Si no existe, lo creamos
    // Esto significa: dar like
    await Like.create({
      usuarioId: usuarioId,
      publicacionId: publicacionId,
      fecha: new Date()
    });

    // 7. Volvemos al home para ver el cambio reflejado
    res.redirect('/');

  } catch (error) {
    console.error('Error al procesar like:', error);
    res.redirect('/');
  }
}

module.exports = {
  toggleLike
};