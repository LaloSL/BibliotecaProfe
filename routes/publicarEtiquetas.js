const express = require('express');
const router = express.Router();

const publicacionEtiquetaController = require('../controllers/publicacionEtiquetaController');
const { requireAuth } = require('../middleware/auth');

// Asociar etiquetas a una publicación
router.post('/:publicacionId', requireAuth, publicacionEtiquetaController.guardar);

module.exports = router;