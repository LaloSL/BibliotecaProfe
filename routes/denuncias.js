const express = require('express');
const router = express.Router();

const denunciasController = require('../controllers/denunciasController');
const { requireAuth } = require('../middleware/auth');

// Mostrar formulario para denunciar una publicación
router.get('/:publicacionId', requireAuth, denunciasController.formulario);

// Guardar denuncia de una publicación
router.post('/:publicacionId', requireAuth, denunciasController.guardar);

module.exports = router;