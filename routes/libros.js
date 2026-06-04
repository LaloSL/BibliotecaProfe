const express = require('express');
const librosController = require('../controllers/librosController');
const { requireAuth, requireAdmin } = require('../middleware/auth'); // Importar middleware de autenticación

const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas de libros
router.use(requireAuth);

router.get('/', librosController.listar);
router.get('/nuevo', requireAdmin, librosController.formulario);
router.post('/nuevo',requireAdmin, librosController.crear);

module.exports = router;
