const Usuario = require('../models/Usuario');
const Prestamo = require('../models/Prestamo');
const { Op } = require('sequelize');

async function listar(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.render('usuarios/lista', { usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).render('usuarios/lista', {
      error: 'Error al listar usuarios'
    });
  }
}

async function formulario(req, res) {
  res.render('usuarios/formulario');
}

async function crear(req, res) {
  const usuario = req.body;
  // Validamos campos
  if (!usuario.nombre || !usuario.dni || !usuario.email) {
    return res.status(400).render('usuarios/formulario', {
      error: 'Todos los campos son obligatorios'
    });
  }

  try {
    // Validar que el usuario no exista con el mismo dni o email
    // SELECT * FROM usuarios WHERE dni = ? OR email = ?
    const usuarioExistente = await Usuario.findOne({
      where: {
        [Op.or]: {
          dni: usuario.dni,
          email: usuario.email
        }
      }
    });
    if (usuarioExistente) {
      return res.status(400).render('usuarios/formulario', {
        error: 'El usuario ya existe'
      });
    }

    await Usuario.create(usuario);
    res.redirect('/usuarios');
  } catch (error) {
    console.error(error);
    res.status(500).render('usuarios/formulario', {
      error: 'Error al crear el usuario'
    });
  }
}

async function prestamos(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: Prestamo
    });
    res.render('usuarios/prestamos', { usuario, prestamos: usuario.Prestamos });
  } catch (error) {
    console.error(error);
    res.status(500).render('usuarios/prestamos', {
      error: 'Error al listar prestamos'
    });
  }
}

async function cantidadPrestamos(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    const cantidad = await Prestamo.count({ where: { usuarioId: usuario.id, fecha_devolucion: null } });
    res.render('usuarios/cantidad', { usuario, cantidad });
  } catch (error) {
    console.error(error);
    res.status(500).render('usuarios/cantidad', {
      error: 'Error al contar prestamos'
    });
  }
}

module.exports = {
  listar,
  formulario,
  crear,
  prestamos,
  cantidadPrestamos
};
