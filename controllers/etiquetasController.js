const Etiqueta = require('../models/Etiqueta');

async function listar(req, res) {
  try {
    const etiquetas = await Etiqueta.findAll({
      order: [['nombre', 'ASC']]
    });

    res.render('etiquetas', {
      title: 'Etiquetas',
      etiquetas
    });

  } catch (error) {
    console.error('Error al listar etiquetas:', error);
    res.status(500).send('Error al listar etiquetas');
  }
}

module.exports = {
  listar
};