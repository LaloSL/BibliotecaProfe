const express = require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentarioController');
const { requireAuth } = require('../middleware/auth');

// Crear comentario para una publicación
router.post('/:publicacionId', requireAuth, comentarioController.crear);

module.exports = router;