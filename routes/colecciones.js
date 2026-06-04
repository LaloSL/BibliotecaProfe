const express = require('express');

const router = express.Router();

const coleccionesController = require('../controllers/coleccionesController');

const { requireAuth } = require('../middleware/auth');

// ======================================
// VER MIS COLECCIONES
// ======================================

router.get('/', requireAuth, coleccionesController.listar);

// ======================================
// FORMULARIO NUEVA COLECCIÓN
// ======================================

router.get('/nueva', requireAuth, coleccionesController.formulario);

// ======================================
// GUARDAR NUEVA COLECCIÓN
// ======================================

router.post('/nueva', requireAuth, coleccionesController.guardar);

// ======================================
// ELIMINAR COLECCIÓN
// ======================================

router.post('/:id/eliminar', requireAuth, coleccionesController.eliminar);

// ======================================
// VER UNA COLECCIÓN
// ======================================

router.get('/:id', requireAuth, coleccionesController.verColeccion);

// ======================================
// AGREGAR PUBLICACIÓN A COLECCIÓN
// ======================================

router.post(
  '/:id/agregar/:publicacionId',
  requireAuth,
  coleccionesController.agregarPublicacion
);

module.exports = router;