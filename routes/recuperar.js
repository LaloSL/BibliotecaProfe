const express = require('express');
const recuperarController = require('../controllers/recuperarController');

const router = express.Router();

router.get('/', recuperarController.formulario);
router.post('/', recuperarController.recuperar);
console.log('Se cargó routes/recuperar.js');
module.exports = router;