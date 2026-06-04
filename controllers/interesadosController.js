const Interes = require('../models/Interes');
const Usuario = require('../models/Usuario');
const Publicacion = require('../models/Publicacion');
const Archivo = require('../models/Archivo');

async function listar(req, res) {
  try {
    const usuarioId = req.session.userId;

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
            },
            {
              model: Usuario
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const interesesFiltrados = intereses.filter(interes => {
      return (
        interes.Publicacion &&
        interes.Publicacion.usuarioId === usuarioId
      );
    });

    res.render('interesados', {
      intereses: interesesFiltrados,
      currentUser: {
        id: req.session.userId,
        nombre: req.session.nombre,
        rol: req.session.rol
      }
    });

  } catch (error) {
    console.error('Error al listar interesados:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  listar
};