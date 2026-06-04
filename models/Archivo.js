const { Model, DataTypes } = require('sequelize');

const sequelize = require('./db');

const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');

class Archivo extends Model {}

Archivo.init(
  {

    // ===============================
    // RUTA DEL ARCHIVO
    // ===============================

    ruta: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    // ===============================
    // TIPO DE ARCHIVO
    // ===============================

    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    // ===============================
    // TAMAÑO DEL ARCHIVO
    // ===============================

    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // ===============================
    // FECHA DE SUBIDA
    // ===============================

    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    // ===============================
    // COPYRIGHT
    // ===============================

    tieneCopyright: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    // ===============================
    // RUTA DE IMAGEN PROTEGIDA
    // ===============================

    rutaProtegida: {
      type: DataTypes.STRING(255),
      allowNull: true
    }

  },
  {
    sequelize,
    modelName: 'Archivo',
    tableName: 'archivos'
  }
);

// ======================================
// RELACIÓN: USUARIO
// ======================================

// Un usuario puede tener muchos archivos
Usuario.hasMany(Archivo, {
  foreignKey: 'usuarioId'
});

// Un archivo pertenece a un usuario
Archivo.belongsTo(Usuario, {
  foreignKey: 'usuarioId'
});

// ======================================
// RELACIÓN: PUBLICACIÓN
// ======================================

// Una publicación puede tener muchos archivos
Publicacion.hasMany(Archivo, {
  foreignKey: 'publicacionId'
});

// Un archivo pertenece a una publicación
Archivo.belongsTo(Publicacion, {
  foreignKey: 'publicacionId'
});

module.exports = Archivo;