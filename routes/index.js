const express = require('express');
const router = express.Router();

const { authenticateUser, logout } = require('../middleware/auth');

// 🔥 Importamos el controller del inicio
const indexController = require('../controllers/indexController');

console.log('Se cargó routes/index.js');

// 🔥 Ruta principal ahora delega al controller
router.get('/', indexController.inicio);

// Login
router.get('/login', (req, res) => {
  console.log('Entró a GET /login');

  if (req.session.userId) {
    return res.redirect('/');
  }

  res.render('login');
});

router.post('/login', authenticateUser, (req, res) => {
  res.redirect('/');
});

// Logout
router.get('/logout', logout);

module.exports = router;