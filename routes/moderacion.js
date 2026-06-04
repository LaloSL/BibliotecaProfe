const express = require('express');

const router = express.Router();

const moderacionController =
  require('../controllers/moderacionController');

const {
  requireAuth,
  requireAdmin
} = require('../middleware/auth');

// ======================================
// PANEL DE MODERACIÓN
// ======================================

router.get('/', requireAuth, requireAdmin, moderacionController.listar);

// ======================================
// APLICAR VEREDICTO
// ======================================

router.post('/:publicacionId', requireAuth, requireAdmin, moderacionController.veredicto);

module.exports = router;