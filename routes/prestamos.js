const express = require('express');
const prestamosController = require('../controllers/prestamosController');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const router = express.Router();





router.get('/',requireAdmin, prestamosController.listar);
router.get('/nuevo',requireAdmin, prestamosController.formulario);
router.post('/nuevo', prestamosController.crear);
router.post('/:id/devolver', prestamosController.devolver);

module.exports = router;
