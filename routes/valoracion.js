const express = require('express');
const router = express.Router();

const valoracionController = require('../controllers/valoracionController');
const { requireAuth } = require('../middleware/auth');

// Guardar valoración de una imagen
// Solo puede valorar un usuario logueado.
// La validación de "no ser dueño de la publicación" se hace en el controller.
router.post('/:archivoId', requireAuth, valoracionController.guardar);

module.exports = router;