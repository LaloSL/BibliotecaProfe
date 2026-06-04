const path = require('path');
const sharp = require('sharp');

const Publicacion = require('../models/Publicacion');
const Archivo = require('../models/Archivo');
const Etiqueta = require('../models/Etiqueta');
const PublicacionEtiqueta = require('../models/PublicacionEtiqueta');

// ======================================
// MOSTRAR FORMULARIO
// ======================================

async function formulario(req, res) {
  try {
    res.render('subir', {
      title: 'Subir publicación'
    });

  } catch (error) {
    console.error('Error al cargar formulario:', error);

    res.status(500).render('subir', {
      title: 'Subir publicación',
      error: 'Error al cargar el formulario'
    });
  }
}

// ======================================
// GUARDAR PUBLICACIÓN
// ======================================

async function guardar(req, res) {
  try {

    console.log('==============================');
    console.log('ENTRÓ AL CONTROLLER DE SUBIR');
    console.log('BODY:', req.body);
    console.log('FILES:', req.files);
    console.log('==============================');

    // ======================================
    // OBTENER DATOS DEL FORMULARIO
    // ======================================

    const {
      descripcion,
      etiqueta,
      tieneCopyright
    } = req.body;

    // ======================================
    // CONVERTIR COPYRIGHT A BOOLEANO
    // ======================================

    const copyrightActivo =
      parseInt(tieneCopyright) === 1;

    // ======================================
    // VALIDACIONES
    // ======================================

    if (!descripcion) {

      return res.status(400).render('subir', {
        title: 'Subir publicación',
        error: 'La descripción es obligatoria'
      });
    }

    if (!etiqueta || etiqueta.trim() === '') {

      return res.status(400).render('subir', {
        title: 'Subir publicación',
        error: 'La etiqueta es obligatoria'
      });
    }

    if (!req.files || req.files.length === 0) {

      return res.status(400).render('subir', {
        title: 'Subir publicación',
        error: 'Debes subir al menos una imagen o video'
      });
    }

    if (!req.session.userId) {

      return res.status(401).render('subir', {
        title: 'Subir publicación',
        error: 'Debes iniciar sesión'
      });
    }

    // ======================================
    // USUARIO LOGUEADO
    // ======================================

    const userId = req.session.userId;

    // ======================================
    // CREAR PUBLICACIÓN
    // ======================================

    const publicacion = await Publicacion.create({

      usuarioId: userId,
      descripcion,
      ubicacion: '',
      fecha: new Date()

    });

    // ======================================
    // RECORRER ARCHIVOS SUBIDOS
    // ======================================

    for (const archivo of req.files) {

      let rutaProtegida = null;

      // ======================================
      // SI TIENE COPYRIGHT Y ES IMAGEN
      // ======================================

      if (
        copyrightActivo &&
        archivo.mimetype.startsWith('image/')
      ) {

        // ======================================
        // RUTA REAL DEL ARCHIVO SUBIDO
        // ======================================

        const rutaOriginalFisica = archivo.path;

        // ======================================
        // NOMBRE NUEVA IMAGEN PROTEGIDA
        // ======================================

        const nombreProtegido =
          `protegida-${archivo.filename}`;

        // ======================================
        // RUTA DONDE SE GUARDARÁ
        // ======================================

        const rutaProtegidaFisica = path.join(
          'public',
          'uploads',
          nombreProtegido
        );

        // ======================================
        // RUTA DE LA MARCA DE AGUA
        // ======================================

        const rutaMarcaAgua = path.join(
          __dirname,
          '../public/MarcaDeAgua/marcaDeAgua.png'
        );

        // ======================================
        // OBTENER TAMAÑO IMAGEN ORIGINAL
        // ======================================

        const metadata =
          await sharp(rutaOriginalFisica).metadata();

        // ======================================
        // REDIMENSIONAR MARCA DE AGUA
        // ======================================

        const anchoMarcaAgua =
          Math.round(metadata.width * 0.45);

        const marcaAguaBuffer =
          await sharp(rutaMarcaAgua)
            .resize({
              width: anchoMarcaAgua
            })
            .toBuffer();

        // ======================================
        // GENERAR IMAGEN PROTEGIDA
        // ======================================

        await sharp(rutaOriginalFisica)
          .composite([
            {
              input: marcaAguaBuffer,
              gravity: 'center'
            }
          ])
          .toFile(rutaProtegidaFisica);

        // ======================================
        // GUARDAR NOMBRE IMAGEN PROTEGIDA
        // ======================================

        rutaProtegida = nombreProtegido;
      }

      // ======================================
      // GUARDAR ARCHIVO EN BASE DE DATOS
      // ======================================

      await Archivo.create({

        usuarioId: userId,
        ruta: archivo.filename,
        tipo: archivo.mimetype,
        size: archivo.size,
        publicacionId: publicacion.id,
        fecha: new Date(),

        tieneCopyright: copyrightActivo,

        rutaProtegida

      });
    }

    // ======================================
    // CREAR O BUSCAR ETIQUETA
    // ======================================

    const [etiquetaCreada] =
      await Etiqueta.findOrCreate({

        where: {
          nombre: etiqueta.trim().toLowerCase()
        }

      });

    // ======================================
    // RELACIONAR PUBLICACIÓN Y ETIQUETA
    // ======================================

    await PublicacionEtiqueta.findOrCreate({

      where: {
        publicacionId: publicacion.id,
        etiquetaId: etiquetaCreada.id
      }

    });

    // ======================================
    // REDIRIGIR AL HOME
    // ======================================

    res.redirect('/');

  } catch (error) {

    console.error(
      'ERROR REAL AL GUARDAR PUBLICACIÓN:',
      error
    );

    res.status(500).render('subir', {
      title: 'Subir publicación',
      error: 'Error al guardar la publicación'
    });
  }
}

// ======================================
// EXPORTAR
// ======================================

module.exports = {
  formulario,
  guardar
};