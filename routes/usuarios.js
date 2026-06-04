const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const { requireAuth, requireAdmin } = require('../middleware/auth'); // Importar middleware de autenticación
const router = express.Router();


// Aplicar middleware de autenticación a todas las rutas de usuarios
router.use(requireAuth);

 

router.get('/', usuariosController.listar);
router.get('/nuevo', requireAdmin, usuariosController.formulario);
router.post('/nuevo', requireAdmin, usuariosController.crear);
router.get('/:id/prestamos',usuariosController.prestamos);
router.get('/:id/cantidad', usuariosController.cantidadPrestamos);

module.exports = router;
