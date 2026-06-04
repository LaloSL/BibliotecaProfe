const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const Archivo = require('../models/Archivo');
const Like = require('../models/Like');
const Comentario = require('../models/Comentario');
const Valoracion = require('../models/Valoracion');
const Etiqueta = require('../models/Etiqueta');
const Denuncia = require('../models/Denuncia');
const DenunciaComentario = require('../models/DenunciaComentario');
const Coleccion = require('../models/Coleccion');

function calcularDatosValoracion(publicacion) {
  let suma = 0;
  let cantidad = 0;

  if (publicacion.Archivos && publicacion.Archivos.length > 0) {
    publicacion.Archivos.forEach(archivo => {
      if (archivo.Valoracions && archivo.Valoracions.length > 0) {
        archivo.Valoracions.forEach(valoracion => {
          suma += valoracion.valor;
          cantidad++;
        });
      }
    });
  }

  const promedio = cantidad > 0 ? suma / cantidad : 0;

  return {
    promedio,
    cantidad
  };
}

async function inicio(req, res) {
  try {
    const {
      buscar,
      tipo,
      ordenar,
      fechaDesde,
      fechaHasta,
      likesMinimos
    } = req.query;

    const currentUser = req.session.userId
      ? {
          id: req.session.userId,
          nombre: req.session.nombre,
          rol: req.session.rol
        }
      : null;

    let colecciones = [];

    if (currentUser) {
      colecciones = await Coleccion.findAll({
        where: {
          usuarioId: currentUser.id
        },
        order: [['nombre', 'ASC']]
      });
    }

    const publicaciones = await Publicacion.findAll({
      where: {
        estadoPublicacion: 'activa'
      },
      include: [
        { model: Usuario },
        {
          model: Archivo,
          include: [{ model: Valoracion }]
        },
        { model: Like },
        {
          model: Comentario,
          include: [
            { model: Usuario },
            { model: DenunciaComentario }
          ]
        },
        { model: Etiqueta },
        { model: Denuncia }
      ],
      order: [['id', 'DESC']]
    });

    let publicacionesFiltradas = publicaciones;

    if (buscar && buscar.trim() !== '') {
      const texto = buscar.trim().toLowerCase();

      publicacionesFiltradas = publicacionesFiltradas.filter(publicacion => {
        const descripcion = publicacion.descripcion
          ? publicacion.descripcion.toLowerCase()
          : '';

        const nombreUsuario = publicacion.Usuario && publicacion.Usuario.nombre
          ? publicacion.Usuario.nombre.toLowerCase()
          : '';

        const etiquetas = publicacion.Etiquetas || publicacion.Etiqueta || [];

        const coincideEtiqueta = etiquetas.some(etiqueta => {
          return etiqueta.nombre.toLowerCase().includes(texto);
        });

        return (
          descripcion.includes(texto) ||
          nombreUsuario.includes(texto) ||
          coincideEtiqueta
        );
      });
    }

    if (tipo && tipo !== '') {
      publicacionesFiltradas = publicacionesFiltradas.filter(publicacion => {
        return (
          publicacion.Archivos &&
          publicacion.Archivos.some(archivo =>
            archivo.tipo && archivo.tipo.startsWith(tipo)
          )
        );
      });
    }

    if (fechaDesde && fechaDesde !== '') {
      const desde = new Date(fechaDesde);

      publicacionesFiltradas = publicacionesFiltradas.filter(publicacion => {
        return new Date(publicacion.createdAt) >= desde;
      });
    }

    if (fechaHasta && fechaHasta !== '') {
      const hasta = new Date(fechaHasta);
      hasta.setHours(23, 59, 59, 999);

      publicacionesFiltradas = publicacionesFiltradas.filter(publicacion => {
        return new Date(publicacion.createdAt) <= hasta;
      });
    }

    if (likesMinimos && likesMinimos !== '') {
      const minimo = parseInt(likesMinimos);

      publicacionesFiltradas = publicacionesFiltradas.filter(publicacion => {
        const cantidadLikes = publicacion.Likes ? publicacion.Likes.length : 0;

        return cantidadLikes >= minimo;
      });
    }

    let publicacionesOrdenadas = publicacionesFiltradas;

    if (ordenar === 'likes') {
      publicacionesOrdenadas = publicacionesOrdenadas.sort((a, b) => {
        const likesA = a.Likes ? a.Likes.length : 0;
        const likesB = b.Likes ? b.Likes.length : 0;

        return likesB - likesA;
      });

    } else if (ordenar === 'valoracion' || !ordenar) {
      publicacionesOrdenadas = publicacionesOrdenadas.sort((a, b) => {
        const valoracionA = calcularDatosValoracion(a);
        const valoracionB = calcularDatosValoracion(b);

        const aTieneVotosConsiderables = valoracionA.cantidad >= 3;
        const bTieneVotosConsiderables = valoracionB.cantidad >= 3;

        if (aTieneVotosConsiderables && !bTieneVotosConsiderables) {
          return -1;
        }

        if (!aTieneVotosConsiderables && bTieneVotosConsiderables) {
          return 1;
        }

        if (valoracionB.promedio !== valoracionA.promedio) {
          return valoracionB.promedio - valoracionA.promedio;
        }

        return valoracionB.cantidad - valoracionA.cantidad;
      });

    } else {
      publicacionesOrdenadas = publicacionesOrdenadas.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    res.render('home', {
      publicaciones: publicacionesOrdenadas,
      currentUser,
      colecciones,
      busqueda: {
        buscar,
        tipo,
        ordenar,
        fechaDesde,
        fechaHasta,
        likesMinimos
      }
    });

  } catch (error) {
    console.error('ERROR AL CARGAR HOME:', error);

    const currentUser = req.session.userId
      ? {
          id: req.session.userId,
          nombre: req.session.nombre,
          rol: req.session.rol
        }
      : null;

    res.status(500).render('home', {
      publicaciones: [],
      currentUser,
      colecciones: [],
      busqueda: {},
      error: 'Error al cargar publicaciones'
    });
  }
}

module.exports = {
  inicio
};