const express = require('express');
const modiController = require('../controllers/modiController');

const router = express.Router();



router.get('/', modiController.formulario);
router.post('/', modiController.modificar);


module.exports = router;