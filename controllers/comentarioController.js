const Comentario = require('../models/Comentario');
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');

async function crear(req, res) {
  try {
    const { publicacionId } = req.params;
    const { contenido } = req.body;

    if (!contenido || contenido.trim() === '') {
      return res.redirect('/');
    }

    const publicacion = await Publicacion.findByPk(publicacionId);

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrada');
    }

    await Comentario.create({
      contenido: contenido.trim(),
      usuarioId: req.session.userId,
      publicacionId: publicacionId
    });

    res.redirect('/');

  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).send('Error al guardar el comentario');
  }
}

module.exports = {
  crear
};