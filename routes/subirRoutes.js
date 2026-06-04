

const express = require('express');
const router = express.Router();

const subirController = require('../controllers/subirController');
const upload = require('../middleware/upload');

// Middleware para validar sesión ANTES de subir la imagen
function validarSesion(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).render('subir', {
      title: 'Subir publicación',
      error: 'Debes iniciar sesión para subir una publicación'
    });
  }

  next();
}

// Mostrar formulario
router.get('/', subirController.formulario);

// Guardar publicación
// Primero valida sesión, después multer guarda la imagen
router.post('/', validarSesion, upload.array('imagenes'), subirController.guardar);

module.exports = router;