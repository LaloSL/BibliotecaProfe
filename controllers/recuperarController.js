const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

async function formulario(req, res) {
  res.render('recuperar');
}

async function recuperar(req, res) {
  try {
    const { dni } = req.body;

    const usuario = await Usuario.findOne({
      where: { dni }
    });

    if (!usuario) {
      return res.render('recuperar', {
        error: 'No existe un usuario registrado con ese DNI'
      });
    }

    const nuevaPassword = '1234';
    const passwordHash = await bcrypt.hash(nuevaPassword, 10);

    usuario.password = passwordHash;
    await usuario.save();

    res.render('recuperar', {
      mensaje: `Contraseña restablecida correctamente. Nueva contraseña temporal: ${nuevaPassword}`
    });

  } catch (error) {
    console.error('Error al recuperar contraseña:', error);
    res.render('recuperar', {
      error: 'Error interno al recuperar contraseña'
    });
  }
}


module.exports = {
  formulario,
  recuperar
};