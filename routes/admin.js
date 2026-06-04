const express = require('express');
const administradorController = require('../controllers/administradorController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();


// SOLO admin puede entrar a todo esto
router.use(requireAdmin);

// Listar usuarios
router.get('/', administradorController.listar);

// Acción: hacer admin
router.post('/:id/hacer-admin', administradorController.hacerAdmin);

// Acción: quitar admin (opcional pero recomendado)
router.post('/:id/quitar-admin', administradorController.quitarAdmin);

module.exports = router;