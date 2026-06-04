const { Model, DataTypes } = require('sequelize');

const sequelize = require('./db');

const Publicacion = require('./Publicacion');
const Etiqueta = require('./Etiqueta');

class PublicacionEtiqueta extends Model {}

PublicacionEtiqueta.init(
  {},
  {
    sequelize,
    modelName: 'PublicacionEtiqueta',
    tableName: 'publicacionetiqueta'
  }
);

// ===============================
// RELACIÓN MUCHOS A MUCHOS
// ===============================

// Una publicación puede tener muchas etiquetas
Publicacion.belongsToMany(Etiqueta, {
  through: PublicacionEtiqueta,
  foreignKey: 'publicacionId'
});

// Una etiqueta puede estar en muchas publicaciones
Etiqueta.belongsToMany(Publicacion, {
  through: PublicacionEtiqueta,
  foreignKey: 'etiquetaId'
});

module.exports = PublicacionEtiqueta;