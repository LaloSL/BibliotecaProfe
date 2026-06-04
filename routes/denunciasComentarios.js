const express = require('express');
const router = express.Router();

const denunciasComentariosController = require('../controllers/denunciasComentariosController');
const { requireAuth } = require('../middleware/auth');

// Guardar denuncia directa desde el home
router.post('/:comentarioId', requireAuth, denunciasComentariosController.guardar);

// Ver denuncias de comentarios recibidas
router.get('/', requireAuth, denunciasComentariosController.listar);

module.exports = router;