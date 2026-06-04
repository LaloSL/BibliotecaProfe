const Mensaje = require('../models/Mensaje');
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');

// Mostrar conversación con otro usuario
async function conversacion(req, res) {
  try {
    const usuarioLogueadoId = req.session.userId;
    const otroUsuarioId = req.params.usuarioId;

    const otroUsuario = await Usuario.findByPk(otroUsuarioId);

    if (!otroUsuario) {
      return res.status(404).send('Usuario no encontrado');
    }

    const mensajes = await Mensaje.findAll({
      where: {
        [Op.or]: [
          {
            emisorId: usuarioLogueadoId,
            receptorId: otroUsuarioId
          },
          {
            emisorId: otroUsuarioId,
            receptorId: usuarioLogueadoId
          }
        ]
      },
      include: [
        {
          model: Usuario,
          as: 'emisor'
        },
        {
          model: Usuario,
          as: 'receptor'
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    res.render('mensajes', {
      mensajes,
      otroUsuario,
      currentUser: {
        id: req.session.userId,
        nombre: req.session.nombre,
        rol: req.session.rol
      }
    });

  } catch (error) {
    console.error('Error al cargar conversación:', error);
    res.status(500).send('Error interno del servidor');
  }
}

// Enviar mensaje
async function enviar(req, res) {
  try {
    const emisorId = req.session.userId;
    const receptorId = req.params.usuarioId;
    const { contenido } = req.body;

    if (!contenido || contenido.trim() === '') {
      return res.redirect(`/mensajes/${receptorId}`);
    }

    await Mensaje.create({
      contenido,
      emisorId,
      receptorId
    });

    res.redirect(`/mensajes/${receptorId}`);

  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).send('Error interno del servidor');
  }
}

// Ver mensajes recibidos
async function recibidos(req, res) {
  try {
    const usuarioId = req.session.userId;

    const mensajes = await Mensaje.findAll({
      where: {
        receptorId: usuarioId
      },
      include: [
        {
          model: Usuario,
          as: 'emisor'
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.render('mensajes', {
      mensajes,
      currentUser: {
        id: req.session.userId,
        nombre: req.session.nombre,
        rol: req.session.rol
      }
    });

  } catch (error) {
    console.error('Error al listar mensajes recibidos:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  conversacion,
  enviar,
  recibidos
};