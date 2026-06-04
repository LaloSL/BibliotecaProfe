const express = require('express');
const router = express.Router();

const publicacionesController = require('../controllers/publicacionesController');

// Middleware para validar sesión antes de modificar comentarios
function validarSesion(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  next();
}

// Ruta para habilitar o deshabilitar comentarios de una publicación
router.post(
  '/:id/modificar-estado-comentarios',
  validarSesion,
  publicacionesController.modificarEstadoComentarios
);

module.exports = router;