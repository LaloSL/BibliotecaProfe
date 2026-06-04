const express = require('express');
const router = express.Router();

const mensajesController = require('../controllers/mensajesController');
const { requireAuth } = require('../middleware/auth');

// Ver mensajes recibidos
router.get('/', requireAuth, mensajesController.recibidos);

// Ver conversación con un usuario específico
router.get('/:usuarioId', requireAuth, mensajesController.conversacion);

// Enviar mensaje a un usuario específico
router.post('/:usuarioId', requireAuth, mensajesController.enviar);

module.exports = router;