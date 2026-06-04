const express = require('express');
const router = express.Router();

const interesadosController = require('../controllers/interesadosController');
const { authenticateUser, requireAuth } = require('../middleware/auth');


// Ver usuarios interesados en mis publicaciones
router.get('/', requireAuth, interesadosController.listar);

module.exports = router;