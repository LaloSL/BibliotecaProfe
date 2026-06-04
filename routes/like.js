const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');

// Ruta que recibe el click del botón de like
// Ejemplo: POST /likes/3
router.post('/:publicacionId', likeController.toggleLike);

module.exports = router;