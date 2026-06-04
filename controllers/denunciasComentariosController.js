const DenunciaComentario = require('../models/DenunciaComentario');
const Comentario = require('../models/Comentario');
const Usuario = require('../models/Usuario');
const Publicacion = require('../models/Publicacion');

// ======================================
// GUARDAR DENUNCIA DE COMENTARIO
// ======================================

async function guardar(req, res) {
  try {
    const { comentarioId } = req.params;
    const usuarioId = req.session.userId;

    if (!usuarioId) {
      return res.redirect('/login');
    }

    const comentario = await Comentario.findByPk(comentarioId);

    if (!comentario) {
      return res.status(404).send('Comentario no encontrado');
    }

    const denunciaExistente = await DenunciaComentario.findOne({
      where: {
        usuarioId,
        comentarioId
      }
    });

    if (denunciaExistente) {
      return res.redirect('/');
    }

    await DenunciaComentario.create({
      motivo: 'comentario_inapropiado',
      descripcion: 'Comentario denunciado por un usuario',
      usuarioId,
      comentarioId,
      estado: 'pendiente'
    });

    res.redirect('/');

  } catch (error) {
    console.error('Error al guardar denuncia de comentario:', error);
    res.status(500).send('Error al guardar denuncia de comentario');
  }
}

// ======================================
// LISTAR DENUNCIAS DE COMENTARIOS
// ======================================

async function listar(req, res) {
  try {
    const usuarioId = req.session.userId;

    const denuncias = await DenunciaComentario.findAll({
      include: [
        {
          model: Comentario,
          include: [
            {
              model: Usuario
            },
            {
              model: Publicacion
            }
          ]
        },
        {
          model: Usuario
        }
      ]
    });

    const denunciasFiltradas = denuncias.filter(d => {
      return (
        d.Comentario &&
        d.Comentario.Publicacion &&
        d.Comentario.Publicacion.usuarioId === usuarioId
      );
    });

    res.render('denunciasComentarios', {
      denuncias: denunciasFiltradas
    });

  } catch (error) {
    console.error('Error al listar denuncias de comentarios:', error);
    res.status(500).send('Error al listar denuncias');
  }
}

module.exports = {
  guardar,
  listar
};