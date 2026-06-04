// 🔴 Librería para subir archivos
const multer = require('multer');

// 🔴 Librería de Node para manejar rutas y extensiones de archivos
const path = require('path');


// 🔥 CONFIGURACIÓN PRINCIPAL: dónde y cómo se guarda la imagen
const storage = multer.diskStorage({

  // 🔴 Define la carpeta donde se guarda la imagen
  destination: function (req, file, cb) {

    // cb = callback → indica a multer dónde guardar
    cb(null, 'public/uploads'); 
    // 👉 IMPORTANTE: esta carpeta debe existir
  },

  // 🔴 Define el nombre del archivo guardado
  filename: function (req, file, cb) {

    // 🔥 Obtiene la extensión del archivo (.jpg, .png, etc)
    const extension = path.extname(file.originalname);

    // 🔥 Genera un nombre único (evita sobrescribir archivos)
    const nombreUnico =
      Date.now() + '-' + Math.round(Math.random() * 1E9) + extension;

    // 🔴 Guarda el archivo con ese nombre
    cb(null, nombreUnico);
  }
});


// 🔥 FILTRO DE SEGURIDAD (muy importante)
const fileFilter = function (req, file, cb) {
  const tiposPermitidos = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ];

  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes o videos'), false);
  }
};


// 🔥 CONFIGURACIÓN FINAL DE MULTER
const upload = multer({

  // 🔴 Cómo se guarda el archivo
  storage,

  // 🔴 Qué archivos se permiten
  fileFilter

});


// 🔴 Exportamos el middleware para usarlo en rutas
module.exports = upload;