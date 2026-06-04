const express = require('express');
const router = express.Router();

const interesesController = require('../controllers/interesesController');
const { requireAuth } = require('../middleware/auth');


// ======================================
// REGISTRAR INTERÉS EN PUBLICACIÓN
// ======================================

router.post('/:publicacionId', requireAuth, interesesController.guardar);

// ======================================
// VER NOTIFICACIONES DE INTERÉS
// ======================================

router.get('/mis-intereses', requireAuth, interesesController.listar);

module.exports = router;