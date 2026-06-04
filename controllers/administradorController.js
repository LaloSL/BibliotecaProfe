const Usuario = require('../models/Usuario');

async function listar(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.render('administrador/lista', { usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al listar usuarios');
  }
}

async function hacerAdmin(req, res) {
  try {
    const { id } = req.params;

    await Usuario.update(
      { rol: 'admin' },
      { where: { id } }
    );

    res.redirect('/administrador');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar rol');
  }
}

async function quitarAdmin(req, res) {
  try {
    const { id } = req.params;

    await Usuario.update(
      { rol: 'usuario' },
      { where: { id } }
    );

    res.redirect('/administrador');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar rol');
  }
}

module.exports = {
  listar,
  hacerAdmin,
  quitarAdmin
};