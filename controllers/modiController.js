const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

async function formulario(req, res) {
  res.render('modiContra');
}

async function modificar(req, res) {
  try {
    const { passwordActual, passwordNueva } = req.body;

    const usuario = await Usuario.findByPk(req.session.userId);

    if (!usuario) {
      return res.redirect('/login');
    }

    const passwordValida = await usuario.validarPassword(passwordActual);

    if (!passwordValida) {
      return res.render('modiContra', {
        error: 'La contraseña actual es incorrecta'
      });
    }

    const passwordHash = await bcrypt.hash(passwordNueva, 10);

    usuario.password = passwordHash;
    await usuario.save();

    res.render('modiContra', {
      mensaje: 'Contraseña modificada correctamente'
    });

  } catch (error) {
    console.error('Error al modificar contraseña:', error);
    res.render('modiContra', {
      error: 'Error interno al modificar contraseña'
    });
  }
}

module.exports = {
  formulario,
  modificar
};