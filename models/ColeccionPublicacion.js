const { Model, DataTypes } = require('sequelize');

const sequelize = require('./db');
const Coleccion = require('./Coleccion');
const Publicacion = require('./Publicacion');

class ColeccionPublicacion extends Model {}

ColeccionPublicacion.init(
  {},
  {
    sequelize,
    modelName: 'ColeccionPublicacion',
    tableName: 'coleccion_publicacion'
  }
);

Coleccion.belongsToMany(Publicacion, {
  through: ColeccionPublicacion,
  foreignKey: 'coleccionId'
});

Publicacion.belongsToMany(Coleccion, {
  through: ColeccionPublicacion,
  foreignKey: 'publicacionId'
});

module.exports = ColeccionPublicacion;