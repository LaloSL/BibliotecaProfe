const express = require('express');

const router = express.Router();

const notificacionesController = require('../controllers/notificacionesController');

const {
  requireAuth
} = require('../middleware/auth');

// ======================================
// COMENTARIOS RECIBIDOS
// ======================================

router.get('/comentarios', requireAuth, notificacionesController.comentariosRecibidos);

// ======================================
// VALORACIONES RECIBIDAS
// ======================================

router.get('/valoraciones', requireAuth, notificacionesController.valoracionesRecibidas);

module.exports = router;