const express = require('express');
const router = express.Router();

const etiquetasController = require('../controllers/etiquetasController');
const { requireAuth } = require('../middleware/auth');

// Por ahora: listar etiquetas existentes
router.get('/', requireAuth, etiquetasController.listar);

module.exports = router;